import { Outlet, Link } from "react-router-dom";
// import DisplayNFTs from "./components/DisplayNFTs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConnectWallet from "./components/ConnectWallet";

const App = () => {
  return (
    <>
      <Header />
      <ConnectWallet />
      <Outlet />

      <div className="album py-5 bg-light">
        <div className="container">
          <Link to="/NFT/0">NFT#0</Link><br />
          <Link to="/NFT/1">NFT#1</Link><br />
          <Link to="/NFT/2">NFT#2</Link>

          {/* <DisplayNFTs /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
