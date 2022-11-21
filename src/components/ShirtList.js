import "./ShirtList.css";
import React from "react";
import { Link } from "react-router-dom";
import Delete from "../delete.svg";
import { projectFirestore } from "../firebase/config";

export default function ShirtsList({ shirts }) {
  const handleClick = (id) => {
    projectFirestore.collection("shirts").doc(id).delete();
  };

  return (
    <div className="jackets-list">
      {shirts.map((shirt) => (
        <div key={shirt.id} className="card">
          <h3>{shirt.title}</h3>
          <div>{shirt.description.substring(0, 50)}...</div>
          <p>Quantity: {shirt.rating}</p>
          <p>{shirt.price} TL</p>
          <Link to={`/merch/${shirt.id}`}>More</Link>
          <img
            className="delete"
            src={Delete}
            onClick={() => handleClick(shirt.id)}
          />
        </div>
      ))}
    </div>
  );
}
