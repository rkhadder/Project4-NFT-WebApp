import { Link } from "react-router-dom";
import { NFT, NFTAttribute } from "../types";

interface Props {
  NFT: NFT;
}

const BADGE_TYPE = ["primary", "info", "success"];

const DisplaySingleNFT = ({ NFT }: Props) => {
  const { name, description, tokenId, image, external_url, attributes } = NFT;

  const getMetadataDisplay = () => {
    return (
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/NFT/${tokenId}`}>{name}</Link>
        </h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <b>
            ID#{tokenId}<br />
            <a href="#">{external_url.substring(8)}</a>
          </b>
          <small className="text-muted" style={{ textAlign: "right" }}>
            {attributes.map((attribute: NFTAttribute, index: number) => (
              <span
                key={attribute.trait_type}
                className={`badge bg-${BADGE_TYPE[index]} m-1`}
              >
                {attribute.trait_type}: {attribute.value}
              </span>
            ))}
          </small>
        </div>
      </div>
    );
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <img className="card-img-top" src={image} alt="Card cap" />
        {getMetadataDisplay()}
      </div>
    </div>
  );
};

export default DisplaySingleNFT;
