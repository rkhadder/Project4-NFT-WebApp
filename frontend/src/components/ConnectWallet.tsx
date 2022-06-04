import { ethers } from "ethers";
import "../App.css";

//TODO type
const ConnectWallet = ({ userAddress, setUserAddress }: any) => {
    console.log()
  const connectWallet = async () => {
    if (window.ethereum) {
      if (window.ethereum.networkVersion !== "3") {
        alert("Please switch to ropsten network"); // TODO use alert component
        return;
      }
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "ropsten"
      );
      console.log(provider);
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
      console.log("Account:", address);
    } else alert("Metamask Not Detected"); // TODO use alert component
  };

  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          {/* <h1 className="fw-light">hdr example</h1>
          <p className="lead text-muted">
          sample test
          </p> */}
          <p>
            {userAddress ? (
              <>
                <span>Connected as</span> <br />
                <span>{userAddress}</span>
              </>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="btn btn-primary my-2"
              >
                Connect Wallet
              </button>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConnectWallet;
