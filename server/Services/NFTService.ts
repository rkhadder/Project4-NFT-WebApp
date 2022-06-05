import { GeneratedNFT, NFT, NFTComponent } from "../Models/NFT";
import { getRandomNumber } from "../Utils";
import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import { logInfo } from "../Config/Logger";
import { BACKGROUND_COMPONENTS, PLAYER_COMPONENTS, WEAPON_COMPONENTS } from "../Data/NFTComponents";

const tempNft : NFT = {
    name: "Project 4 NFT#2473",
    description: "NFT for Project 4 of Encode May's Solidity Bootcamp",
    tokenId: 2473,
    image: "https://img.seadn.io/files/9b791356bc13e1fb3da2350aee28bc4e.png",
    external_url: "https://project4.com",
    attributes: [{"trait_type":"Background","value":"New Punk Blue"},{"trait_type":"Eyes","value":"Hypnotized"},{"trait_type":"Mouth","value":"Bored"},{"trait_type":"Hat","value":"Sushi Chef Headband"},{"trait_type":"Fur","value":"Golden Brown"}]
};

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