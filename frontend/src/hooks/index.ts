// hooks/index.ts
import { ethers } from "ethers";
import { useContractFunction } from "@usedapp/core";
import { NFT_ABI } from "../ABI/NFT";
import { NFT_CONTRACT_ADDRESS } from "../constant.js";

const contractInterface = new ethers.utils.Interface(NFT_ABI);
const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, contractInterface);

export function useMint() {
  const { state, send } = useContractFunction(contract, "safeMint", {});
  return { state, send };
}
