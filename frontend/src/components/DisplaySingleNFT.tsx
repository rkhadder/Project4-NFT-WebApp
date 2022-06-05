import { NFT, NFTAttribute } from "../types";

interface Props {
  NFT: NFT;
}

const DisplaySingleNFT = ({ NFT }: Props) => {
  const { name, description, tokenId, image, external_url, attributes } = NFT;
  console.log(NFT);

  const getMetadataDisplay = () => {
    return (
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <b>
            {tokenId} / {external_url}
          </b>
          <small className="text-muted">
            {attributes.map((attribute: NFTAttribute) => (
              <p key={attribute.trait_type}>
                {attribute.trait_type} &gt; {attribute.value}
              </p>
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
