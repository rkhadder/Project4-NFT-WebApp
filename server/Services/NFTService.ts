import { GeneratedNFT, NFT } from "../Models/NFT";
import { connectToWallet, getRandomNumber } from "../Utils";
import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import { logError, logInfo, logWarn } from "../Config/Logger";
import { BACKGROUND_COMPONENTS, PLAYER_COMPONENTS, WEAPON_COMPONENTS } from "../Data/NFTComponents";
import { uploadFile, uploadJson } from "./PinataService";
import { IPFS_WEB_URL, PROJECT_NAME } from "../Constants";
import { Contract, ethers } from 'ethers';
import { NFT_CONTRACT_ADDRESS, WALLET_PRIVATE_KEY } from "../Config/Config";
import { DungeonDefenders, } from "../Models/NFTToken";
import * as db from './DBService';
import compiledContract from "../Data/NFTToken";

export function getNFTMetadata(tokenId: string) : NFT | undefined {
    return db.getNFTMetadata(tokenId);
}

export function getNFTMetadatas() : NFT[] {
    return db.getNFTs();
}

export async function generateNFT() : Promise<GeneratedNFT> {
    const background = BACKGROUND_COMPONENTS[getRandomNumber(0, 4)];
    const player = PLAYER_COMPONENTS[getRandomNumber(0, 6)];
    const weapon = WEAPON_COMPONENTS[getRandomNumber(0, 4)];

    logInfo(`background=${JSON.stringify(background)}`, 'generateNFT');
    logInfo(`player=${JSON.stringify(player)}`, 'generateNFT');
    logInfo(`weapon=${JSON.stringify(weapon)}`, 'generateNFT');

    const mergedImage = await mergeImages([
        background.imgPath,
        {
            src: `Assets/Floor/${getRandomNumber(1, 9)}.png`,
            x: 0,
            y: 160
        },
        {
            src: `Assets/Floor/${getRandomNumber(1, 9)}.png`,
            x: 160,
            y: 160
        },
        {
            src: `Assets/Floor/${getRandomNumber(1, 9)}.png`,
            x: 320,
            y: 160
        },
        {
            src: `Assets/Floor/${getRandomNumber(1, 9)}.png`,
            x: 0,
            y: 320
        },
        {
            src: `Assets/Floor/${getRandomNumber(1, 9)}.png`,
            x: 160,
            y: 320
        },
        {
            src: `Assets/Floor/${getRandomNumber(1, 9)}.png`,
            x: 320,
            y: 320
        },
        player.imgPath,
        weapon.imgPath], {
        Canvas,
        Image
    });
    const mergedImageBuffer = mergedImage.substring(mergedImage.indexOf(','));

    return {
        data: Buffer.from(mergedImageBuffer, 'base64'),
        attributes: [background.attribute, player.attribute, weapon.attribute]
    }
}

export async function uploadNFT(generatedNFT: GeneratedNFT, id: number) : Promise<[NFT, string]> {
    const nftName = `${PROJECT_NAME}#${id}`;

    const imageCID = await uploadFile(generatedNFT.data, `${nftName}.jpg`);
    const imageUrl = `${IPFS_WEB_URL}${imageCID}`;
    const nft : NFT = {
        name: nftName,
        description: "NFT for Project 4 of Encode May's Solidity Bootcamp",
        tokenId: id,
        image: imageUrl,
        external_url: "https://project4.com",
        attributes: generatedNFT.attributes
    };
    db.storeNFTMetadata(id.toString(), nft);
    const metadataCID = await uploadJson(nft, `${nftName}.json`);
    db.storeNFTCID(id.toString(), metadataCID);
    return [nft, metadataCID];
}

async function handleMintEvent(tokenId: number) {
    const metadata = db.getNFTMetadata(tokenId.toString());
    if (metadata) {
        logWarn(`tokenId=${tokenId} already minted`, 'handleMintEvent');
        return;
    }

    logInfo(`Minting for tokenId=${tokenId}`, 'handleMintEvent');
    const generatedNFT = await generateNFT();
    await uploadNFT(generatedNFT, tokenId);
}
export function registerEventListeners() {
    if (!WALLET_PRIVATE_KEY) {
        logError('Don\'t have wallet secret key setup', 'registerEventListeners');
        return;
    }
    if (!NFT_CONTRACT_ADDRESS) {
        logError('Don\'t have nft contract address setup', 'registerEventListeners');
        return;
    }

    const [provider, _wallet, signer] = connectToWallet() ?? [];
    if (!provider) {
        logError('No provider', 'registerEventListeners');
        return;
    }

    const tokenContract: DungeonDefenders = new Contract(
        NFT_CONTRACT_ADDRESS,
        compiledContract.abi,
        signer
    ) as DungeonDefenders;

    logInfo('Connecting to transfer events', 'registerEventListeners');
    const transferFilter = tokenContract.filters.Transfer();
    provider.on(transferFilter, async (log) => {
        const fromStr = log.topics[1];
        const toStr = log.topics[2];
        const tokenIdStr = log.topics[3];
        logInfo(`Transfered tokenId=${tokenIdStr} from=${fromStr} to=${toStr}`, 'registerEventListeners');
        if (!ethers.utils.isAddress(fromStr)) {
            const tokenId = parseInt(tokenIdStr.replace('0x', ''), 16);
            await handleMintEvent(tokenId);
        }
    });
}