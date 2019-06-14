import axios from "axios";
const pinata_gateway_url = "https://gateway.pinata.cloud/ipfs/";

export const uploadAssetMetaData = async (mt) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pinataImageResponse;
      if (mt.picture) {
        pinataImageResponse = await pinFileToIPFS(mt.picture);
        if (!pinataImageResponse.success) {
          return reject();
        }
      }

      let metaData = {
        name: mt.name,
        description: mt.description,
        image: pinataImageResponse?.pinataUrl || mt.ImageUrl,
      };

      const pinataRespone = await pinJSONToIPFS(metaData);

      if (!pinataRespone.success) return reject();

      const tokenUri = pinataRespone.pinataUrl;
      return resolve({
        image_uri: pinataImageResponse?.pinataUrl,
        metaData_uri: tokenUri,
      });
    } catch {
      return reject();
    }
  });
};
const pinFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", file);
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append("pinataOptions", pinataOptions);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        // pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        // pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRECT_API_KEY,
        pinata_api_key: "cf7a4f0c3e5aa33eeb7d",
        pinata_secret_api_key:
          "98a0feaef3c8ac80ae2b39e476c4adf847ebd5440bba92be539f1caaf3f76be6",
      },
    })
    .then((response) => ({
      success: true,
      pinataUrl: pinata_gateway_url + response.data.IpfsHash,
    }))
    .catch((error) => ({
      success: false,
      status: `Something went wrong: ${error.message}`,
    }));
};

const pinJSONToIPFS = async (JSONBody) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: "cf7a4f0c3e5aa33eeb7d",
        pinata_secret_api_key:
          "98a0feaef3c8ac80ae2b39e476c4adf847ebd5440bba92be539f1caaf3f76be6",
      },
    })
    .then((response) => ({
      success: true,
      pinataUrl: pinata_gateway_url + response.data.IpfsHash,
    }))
    .catch((error) => ({
      success: false,
      message: error.message,
    }));
};
