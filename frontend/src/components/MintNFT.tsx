import { useMint } from "../hooks/index";

type MintProps = {
  userAddress: string;
};

const MintNFT: React.FC<MintProps> = ({ userAddress }: any) => {
  const { send: sendMint } = useMint();

  const mint = async () => {
    sendMint(userAddress)
  };

  return (
    <button onClick={() => mint()} className="btn btn-primary my-2">
      Mint
    </button>
  );
};

export default MintNFT;
