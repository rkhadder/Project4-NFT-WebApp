import express, { Router } from "express";
import { logInfo } from "../../../Config/Logger";
import { generateNFT, getNFTMetadata } from "../../../Services/NFTService";

const router = express.Router();
router.post('/generate', async (_req, res) => {
    logInfo(`Generating NFT`);
    const nft = await generateNFT();
    logInfo(`Generated NFT with attributes=${JSON.stringify(nft.attributes)}`);

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': nft.data.length
    });
    return res.end(nft.data);
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