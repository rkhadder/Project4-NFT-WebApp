import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const PINATA_API_KEY = process.env.PINATA_API_KEY ?? '';
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY ?? '';

export {
    SERVER_PORT,
    PINATA_API_KEY,
    PINATA_SECRET_KEY
}