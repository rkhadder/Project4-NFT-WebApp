import { useEffect, useState } from "react";
import { API_ADDRESS } from "../constant";
import DisplaySingleNFT from "../components/DisplaySingleNFT";
import type { NFT } from "../types"

const getAllNFT = async () => {
  const res = await fetch(`${API_ADDRESS}/v1/nft`);
  const nftData = await res.json();

  return nftData;
};

export default function NFT() {
  const [allNFT, setAllNFT] = useState<Array<NFT> | null>(null);
  useEffect(() => {
    const wrapper = async () => {
      const result = await getAllNFT();
      setAllNFT(result);
    };
    wrapper();
  }, []);

  return (
    allNFT && (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {allNFT.map((NFT: NFT) => (
          <DisplaySingleNFT key={NFT.tokenId} NFT={NFT} />
        ))}
      </div>
    )
  );
}
