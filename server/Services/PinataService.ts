import pinataSDK from '@pinata/sdk';
import { Readable } from 'stream';
import { PINATA_API_KEY, PINATA_SECRET_KEY } from '../Config/Config';
import { logError, logInfo } from '../Config/Logger';

const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_KEY);
pinata.testAuthentication().then(res => {
    logInfo(`Connected to Pinata=${JSON.stringify(res)}`, 'PinataService');
}).catch(err => {
    logError(`Failed to connect to Pinata=${err}`, 'PinataService');
})

/**
 * Upload a file to Pinata IPFS
 * @param fileBuffer Buffer for file we want to upload
 * @param fileName Name of the file we're uploading
 * @returns the CID for the file
 */
export async function uploadFile(fileBuffer: Buffer, fileName: string) : Promise<string> {
    try {
        const fileStream = Readable.from(fileBuffer);
        (fileStream as any).path = fileName;
        const result = await pinata.pinFileToIPFS(fileStream, {pinataMetadata: { name: fileName}});
        return result.IpfsHash;
    } catch (error) {
        logError(`uploadFile threw an error=${error}`, 'pinataSDK')
        throw error;
    }
}

/**
 * Upload JSON to Pinata IPFS
 * @param data Any JSON blob
 * @param fileName Name of the JSON file we're uploading
 * @returns the CID for the file
 */
export async function uploadJson(data: any, fileName: string) : Promise<string> {
    try {
        const result = await pinata.pinJSONToIPFS(data, {pinataMetadata: { name: fileName}});
        return result.IpfsHash;
    } catch (error) {
        logError(`uploadFile threw an error=${error}`, 'pinataSDK')
        throw error;
    }
}