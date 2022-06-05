import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const PINATA_API_KEY = process.env.PINATA_API_KEY ?? '';
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY ?? '';
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;

export {
    SERVER_PORT,
    PINATA_API_KEY,
    PINATA_SECRET_KEY,
    WALLET_PRIVATE_KEY,
    ALCHEMY_API_KEY,
    NFT_CONTRACT_ADDRESS
}