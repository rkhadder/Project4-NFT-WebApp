import express, { Router } from "express";
import { logInfo } from "../../../Config/Logger";
import { generateNFT, getNFTMetadata, getNFTMetadatas, uploadNFT } from "../../../Services/NFTService";

let counter : number = 0;

const router = express.Router();
router.post('/generate', async (_req, res) => {
    logInfo(`Generating NFT`);
    const generatedNFT = await generateNFT();
    logInfo(`Generated NFT with attributes=${JSON.stringify(generatedNFT.attributes)}`);
    logInfo('Uploading NFT');
    const [nft, cid] = await uploadNFT(generatedNFT, counter++);
    logInfo(`Uploaded NTF metadata cid=${cid}`)

    return res.json({nft: nft, cid: cid});
})
router.get('/', (_req, res) => {
    logInfo(`Getting all NFT metadatas`);
    const metadatas = getNFTMetadatas();

    return res.json({NFTs: metadatas});
})
router.get('/:id', (req, res) => {
    const tokenId = req.params.id;
    logInfo(`Getting metadata for tokenId=${tokenId}`);
    const metadata = getNFTMetadata(tokenId);
    logInfo(`Got metadata for tokenId=${tokenId} metadata=${JSON.stringify(metadata)}`);

    if (!metadata) {
        return res.status(404);
    }

    return res.json(metadata);
})

export default function registerNFTRoutes(r: Router) {
    r.use('/nft', router);
}