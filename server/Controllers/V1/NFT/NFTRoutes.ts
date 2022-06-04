import express, { Router } from "express";

const router = express.Router();


export default function registerNFTRoutes(r: Router) {
    r.use('/nft', router);
}