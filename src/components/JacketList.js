import "./JacketList.css";
import React from "react";
import { Link } from "react-router-dom";
import Delete from "../delete.svg";
import { projectFirestore } from "../firebase/config";

export default function JacketList({ jackets }) {
  const handleClick = (id) => {
    projectFirestore.collection("jackets").doc(id).delete();
  };

  return (
    <div className="shirts-list">
      {jackets.map((jacket) => (
        <div key={jacket.id} className="card">
          <h3>{jacket.title}</h3>
          <div>{jacket.description.substring(0, 50)}...</div>
          <p>Quantity: {jacket.rating}</p>
          <p>{jacket.price} TL</p>
          <Link to={`/merch/${jacket.id}`}>More</Link>
          <img
            className="delete"
            src={Delete}
            onClick={() => handleClick(jacket.id)}
          />
        </div>
      ))}
    </div>
  );
}
