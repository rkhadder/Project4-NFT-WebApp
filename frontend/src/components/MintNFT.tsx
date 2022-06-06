import { useMint } from "../hooks/index";

type MintProps = {
  userAddress: string;
};

const MintNFT: React.FC<MintProps> = ({ userAddress }: any) => {
  const { send: sendMint } = useMint();

  const mint = async () => {
    sendMint(userAddress);
  };

  return (
    <div className="col-6 offset-3">
      <button onClick={() => mint()} className="btn btn-lg btn-primary w-100">
        Mint
      </button>
    </div>
  );
};

export default MintNFT;
