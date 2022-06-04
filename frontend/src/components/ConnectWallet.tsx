import React, { useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import "../App.css";

//TODO type
const ConnectWallet = ({ userAddress, setUserAddress }: any) => {
  //   useEffect(() => {
  //     const getProvider = async () => {
  //       const provider = await detectEthereumProvider();

  //       if (provider) {
  //           console.log(window.ethereum.networkVersion)
  //         if (window.ethereum.networkVersion !== "3") {
  //           alert("Please switch to ropsten network"); // TODO use alert component
  //           return;
  //         }
  //         const accounts = await window.ethereum.request({
  //           method: "eth_requestAccounts",
  //         });
  //         if (accounts.length === 0) {
  //           console.log("Please connect to MetaMask.");
  //         } else if (accounts[0] !== userAddress) setUserAddress(accounts[0]);
  //       } else alert("Please install MetaMask!");
  //     };

  //     getProvider();
  //   }, []);

  useEffect(() => {
    const autoConnect = async () => {
      if (window.ethereum && window.ethereum.networkVersion !== "3") {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "ropsten"
        );

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
      }
    };

    autoConnect();
  }, []);

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

      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
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
