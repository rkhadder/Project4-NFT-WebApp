// import DisplayNFTs from "./components/DisplayNFTs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConnectWallet from "./components/ConnectWallet";

const App = () => {
  return (
    <>
      <Header />
      <ConnectWallet />

      <div className="album py-5 bg-light">
        <div className="container">
          {/* <DisplayNFTs /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
