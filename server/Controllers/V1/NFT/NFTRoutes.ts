import express, { Router } from "express";
import { logInfo } from "../../../Config/Logger";
import { getNFTMetadata } from "../../../Services/NFTService";

const router = express.Router();
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