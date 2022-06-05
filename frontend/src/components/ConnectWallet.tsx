// import MintNFT from "./MintNFT";
import { useEthers, useEtherBalance } from "@usedapp/core";

// ConnectButton.tsx
function ConnectWallet() {
    const {activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);
  
    function handleConnectWallet() {
      activateBrowserWallet();
      console.log(etherBalance)
    }
  
    return  (
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              {/* <h1 className="fw-light">hdr example</h1>
              <p className="lead text-muted">
              sample test
              </p> */}
              <p>
                {account ? (
                  <>
                    <span>Connected as</span> <br />
                    <span>{account}</span> <br />
                    {/* <MintNFT userAddress={account} /> */}
                  </>
                ) : (
                  <button
                    onClick={() => handleConnectWallet()}
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
  }

export default ConnectWallet;
