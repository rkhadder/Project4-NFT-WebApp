import { Outlet, Link } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import MintNFT from "./components/MintNFT";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConnectWallet from "./components/ConnectWallet";

const App = () => {
  const { account } = useEthers();
  return (
    <>
      <Header />

      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Welcome to Dungeon Defenders</h1>
            <p className="lead text-muted">
              Join our community by minting your first NFT
            </p>
            <p>
              {account ? (
                <>
                  <MintNFT userAddress={account} />
                </>
              ) : (
                <ConnectWallet />
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
