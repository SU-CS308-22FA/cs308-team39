import "./MerchList.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Delete from "../delete.svg";
import { projectFirestore } from "../firebase/config";

import { useAuthContext } from "../hooks/useAuthContext";

export default function MerchList({ merchs }) {
  const { user } = useAuthContext();
  const [userType, setUserType] = useState("");

  const getUserType = async () => {
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", doc.data().type);
    }
    setUserType(doc.data().type);
  };
  useEffect(() => {
    getUserType();
  }, []);
  console.log("usertype:", userType);

  const handleClick = (id) => {
    projectFirestore.collection("merchandises").doc(id).delete();
  };

  return (
    <div className="merch-list">
      {merchs.map((merch) => (
        <div key={merch.id} className="card">
          <h3>{merch.title}</h3>
          <img
            alt="product"
            className="image"
            src={merch.imageURL}
            width="150 "
            height="200"
          />
          <div>{merch.description.substring(0, 50)}...</div>
          <p>Quantity: {merch.rating}</p>
          <p>{merch.price} TL</p>
          <Link to={`/merch/${merch.id}`}>More</Link>
          {(user && userType === merch.team) || (
            <img
              alt="delete"
              className="delete"
              src={Delete}
              onClick={() => handleClick(merch.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
