import React, { useState } from "react";
// import DisplayNFTs from "./components/DisplayNFTs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConnectWallet from "./components/ConnectWallet";

const App = () => {
  const [userAddress, setUserAddress] = useState<null | string>(null);
  return (
    <>
      <Header />
      <main>
        <ConnectWallet />

        <div className="album py-5 bg-light">
          <div className="container">
            {/* <DisplayNFTs /> */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
  // return (
  //   <div className="App">
  //     <DisplayNFT />
  //   </div>
  // );
};

export default App;
