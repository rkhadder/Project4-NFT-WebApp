import { NFT } from "../Models/NFT";

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