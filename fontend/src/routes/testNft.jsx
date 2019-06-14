import React, { useState } from "react";
import { uploadAssetMetaData } from "../api/mint";

function TestNft() {
  const [item, setItem] = useState({
    picture: "logo192.png",
    name: "",
    description: "",
  });

  const onChange = (e, type = 0) => {
    if (type) {
      setItem({ ...item, [e.target.name]: e.target.files[0] });
    } else {
      // console.log(e.target.name);
      setItem({
        ...item,
        [e.target.name]: e.target.value,
      });
    }
  };
  const onClickMint = async () => {
    const res = await uploadAssetMetaData(item);
    console.log(res);
    setItem({
      ...item,
      image: res.image_uri,
    });
    console.log(res.metaData_uri);
  };

  return (
    <>
      <div>
        <h1>Mint Item</h1>
        <div>
          <div>Name:</div>
          <input
            type="text"
            name="name"
            onChange={(e) => onChange(e)}
            value={item.name}
          />
        </div>
        <div>
          <div>Description:</div>
          <input
            type="text"
            name="description"
            onChange={(e) => onChange(e)}
            value={item.description}
          />
        </div>
        <div>
          <div>Picture:</div>
          <input type="file" name="picture" onChange={(e) => onChange(e, 1)} />
          <img src={item.picture} alt="" />
        </div>
        <div>
          <button onClick={onClickMint}>Upload</button>
        </div>
      </div>
    </>
  );
}

export default TestNft;
