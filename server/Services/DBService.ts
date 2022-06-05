import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { NFT } from '../Models/NFT';
import { logError } from '../Config/Logger';

const db = new JsonDB(new Config('Data/db', true, false, '/'));

export function storeNFTMetadata(tokenId: string, nft: NFT) {
    db.push(`/nft/${tokenId}`, nft, true);
}

export function storeNFTCID(tokenId: string, cid: string) {
    db.push(`/cids/${tokenId}`, cid, true);
}

export function getNFTMetadata(tokenId: string) : NFT | undefined {
    try {
        return db.getData(`/nft/${tokenId}`);
    } catch (e) {
        logError(JSON.stringify(e), 'getNFTMetadata');
        return undefined;
    }
}

export function getNFTs() : NFT[] {
    const data = db.getData('/nft');
    return Object.keys(data).map(k => data[k]);
}