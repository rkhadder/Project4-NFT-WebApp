import { ethers } from "ethers";
import "dotenv/config";
import * as nftJson from "../../artifacts/contracts/nft.sol/MyToken.json";
import { connectToWallet } from "../utils";

/**
 * > deploy
 * 
 * Deploy ballot with environment's wallet as the chairperson.
 */
async function main() {

  // Connect to wallet
  const { signer } = await connectToWallet();

  // Deploy wallet
  console.log("Deploying NFT contract");
  
  const TokenFactory = new ethers.ContractFactory(
    nftJson.abi,
    nftJson.bytecode,
    signer
  );
  const tokenContract = await TokenFactory.deploy();
  console.log("Awaiting confirmations");
  await tokenContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${tokenContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
