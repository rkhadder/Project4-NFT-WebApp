import { GeneratedNFT, NFT } from "../Models/NFT";
import { connectToWallet, getRandomNumber } from "../Utils";
import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import { logError, logInfo } from "../Config/Logger";
import { BACKGROUND_COMPONENTS, PLAYER_COMPONENTS, WEAPON_COMPONENTS } from "../Data/NFTComponents";
import { uploadFile, uploadJson } from "./PinataService";
import { IPFS_WEB_URL, PROJECT_NAME } from "../Constants";
import { Contract, ethers } from 'ethers';
import { NFT_CONTRACT_ADDRESS, WALLET_PRIVATE_KEY } from "../Config/Config";
import { DungeonDefenders, } from "../Models/NFTToken";
import compiledContract from "../Data/NFTToken";

const tempNft : NFT = {
    name: "Project 4 NFT#2473",
    description: "NFT for Project 4 of Encode May's Solidity Bootcamp",
    tokenId: 2473,
    image: "https://img.seadn.io/files/9b791356bc13e1fb3da2350aee28bc4e.png",
    external_url: "https://project4.com",
    attributes: [{"trait_type":"Background","value":"New Punk Blue"},{"trait_type":"Eyes","value":"Hypnotized"},{"trait_type":"Mouth","value":"Bored"},{"trait_type":"Hat","value":"Sushi Chef Headband"},{"trait_type":"Fur","value":"Golden Brown"}]
};

const cachedNFTs : Record<string, NFT> = {};
const tokenToCIDMap : Record<string, string> = {};

export function getNFTMetadata(_tokenId: string) : NFT {
    return tempNft;
}

export async function generateNFT() : Promise<GeneratedNFT> {
    const background = BACKGROUND_COMPONENTS[getRandomNumber(0, 4)];
    const player = PLAYER_COMPONENTS[getRandomNumber(0, 6)];
    const weapon = WEAPON_COMPONENTS[getRandomNumber(0, 4)];

    logInfo(`background=${JSON.stringify(background)}`, 'generateNFT');
    logInfo(`player=${JSON.stringify(player)}`, 'generateNFT');
    logInfo(`weapon=${JSON.stringify(weapon)}`, 'generateNFT');

    const mergedImage = await mergeImages([background.imgPath, player.imgPath, weapon.imgPath], {
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
    cachedNFTs[id] = nft;
    const metadataCID = await uploadJson(nft, `${nftName}.json`);
    tokenToCIDMap[id] = metadataCID;
    return [nft, metadataCID];
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
            const tokenId = parseInt(tokenIdStr.replace('0x', ''));
            logInfo(`Minting for tokenId=${tokenId}`, 'registerEventListeners');
            const generatedNFT = await generateNFT();
            await uploadNFT(generatedNFT, tokenId);
        }
    });
}