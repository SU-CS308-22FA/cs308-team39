import React from "react";
import "./Merch.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

export default function Merch() {
  const { id } = useParams();

  const [merch, setMerch] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("merchandises")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setMerch(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find the merchandise");
        }
      });

    return () => unsub;
  }, [id]);

  const handleClick = () => {
    projectFirestore.collection("merchandises").doc(id).update({
      title: "Title updated",
    });
  };

  return (
    <div className="merch">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {merch && (
        <>
          <h2 className="page-title">{merch.title}</h2>
          <p>{merch.description}</p>
          <p>Quantity {merch.rating}</p>
          <p>{merch.price} TL</p>
          <button onClick={handleClick}>Update</button>
        </>
      )}
    </div>
  );
}
