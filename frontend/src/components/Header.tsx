import ConnectWallet from "./ConnectWallet";

const Header = () => {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <div>
            <a href="/" className="navbar-brand d-flex align-items-center">
              <strong>Dungeon Defenders</strong>
            </a>
          </div>
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
};

export default Header;
