import { useState, useEffect } from "react";
import { useTransfer } from "../hooks/index";

type TransferProps = {
  userAddress: string;
};

const TransferNFT: React.FC<TransferProps> = ({ userAddress }: any) => {
  const { state, send: sendTransfer } = useTransfer();
  const [to, setTo] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const transfer = async () => {
    if (!to || !id) {
      setError("Missing valid ID or Address");
      return;
    }
    sendTransfer(userAddress, to, id);
    setError(null);
  };

  useEffect(() => {
    if (state.errorMessage) setError(state.errorMessage);
  }, [state]);

  return (
    <div className="col-6 offset-3 mt-5">
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            onClick={() => setError(null)}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="address"
          aria-label="address"
          aria-describedby="basic-addon1"
          onChange={(e) => setTo(e.target.value)}
          value={to}
        />
        <span
          className="input-group-text"
          id="basic-addon1"
          style={{ width: "100px" }}
        >
          To
        </span>
      </div>

      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="1337"
          aria-label=" Token #ID"
          aria-describedby="basic-addon2"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        <span
          className="input-group-text"
          id="basic-addon2"
          style={{ width: "100px" }}
        >
          Token #ID
        </span>
      </div>
      <button
        onClick={() => transfer()}
        className="btn btn-lg btn-primary w-100"
      >
        Transfer
      </button>
    </div>
  );
};

export default TransferNFT;
