import "./MerchList.css";
import React from "react";
import { Link } from "react-router-dom";
import Delete from "../delete.svg";
import { projectFirestore } from "../firebase/config";

export default function MerchList({ merchs }) {
  const handleClick = (id) => {
    projectFirestore.collection("merchandises").doc(id).delete();
  };

  return (
    <div className="merch-list">
      {merchs.map((merch) => (
        <div key={merch.id} className="card">
          <h3>{merch.title}</h3>
          <div>{merch.description.substring(0, 50)}...</div>
          <p>Quantity: {merch.rating}</p>
          <p>{merch.price} TL</p>
          <Link to={`/merch/${merch.id}`}>More</Link>
          <img
            alt="x"
            className="delete"
            src={Delete}
            onClick={() => handleClick(merch.id)}
          />
        </div>
      ))}
    </div>
  );
}
