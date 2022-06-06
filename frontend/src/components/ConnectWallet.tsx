import { useEthers, useEtherBalance } from "@usedapp/core";

function ConnectWallet() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
    console.log(etherBalance);
  }

  return (
    <div>
      {account ? (
        <>
            <button type="button" className="btn btn-outline-primary">
              {account.slice(0, 6)}...
              {account.slice(account.length - 4, account.length)}
            </button>
        </>
      ) : (
        <button
          onClick={() => handleConnectWallet()}
          className="btn btn-primary"
        >
          Connect
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;
