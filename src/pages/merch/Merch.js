import React from "react";
import "./Merch.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
//import { useAuthContext } from "../../hooks/useAuthContext";
import MerchComments from "./MerchComments";

export default function Merch() {
  //const { user } = useAuthContext();
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
          setMerch(doc);
          console.log(doc.id);
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
          <h2 className="page-title">{merch.data().title}</h2>
          <img
            alt="product"
            src={merch.data().imageURL}
            width="375"
            height="500"
          />
          <p>{merch.data().description}</p>
          <p>Quantity: {merch.data().rating}</p>
          <p>{merch.data().price} TL</p>
          <button onClick={handleClick}>Update</button>
          <MerchComments merchandise={merch} />
        </>
      )}
    </div>
  );
}
