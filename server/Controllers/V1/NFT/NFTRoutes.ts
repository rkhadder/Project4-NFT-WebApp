import express, { Router } from "express";
import { logInfo } from "../../../Config/Logger";
import { generateNFT, getNFTMetadata, getNFTMetadatas, uploadNFT } from "../../../Services/NFTService";

let counter : number = 0;

const router = express.Router();
router.post('/generate', async (_req, res) => {
    logInfo(`Generating NFT`);
    const generatedNFT = await generateNFT();
    logInfo(`Generated NFT with attributes=${JSON.stringify(generatedNFT.attributes)}`);

    res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": generatedNFT.data.length
    });

    return res.end(generatedNFT.data);
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