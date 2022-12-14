import React from "react";
import "./Merch.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import MerchComments from "./MerchComments";
import { useFirestore } from "../../hooks/useFirestore";


export default function Merch() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { updateDocument, response } = useFirestore("carts");
  const [merch, setMerch] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [cartItem, setCartItem] = useState(null);

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

  
  const addToCart = async (e) => {
    e.preventDefault();
  
    try {
      const doc = await projectFirestore.collection("carts").doc(user.uid).get()
      console.log(merch.id)
      if(doc.data() == undefined || doc.data().merchIds == undefined){
        await projectFirestore.collection("carts").doc(user.uid).set({
          merchIds: [merch.id]
        });
        
      }
      else {
        
        console.log(merch.id)
        if(!(doc.data().merchIds.includes(String(merch.id))) ) {
          await updateDocument(doc.id, {
            merchIds: [...doc.data().merchIds, merch.id],
          });
        }
        console.log(doc.data().merchIds)
      }
      
      
      
    } catch (error) {
      console.log(error)
    }
    
  };
  /*
  const handleClick = () => {
    projectFirestore.collection("merchandises").doc(id).update({
      title: "Title updated",
    });
  };
*/
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
          {user && (<button className="btn" onClick={addToCart}>Add To Cart</button>) }
          <MerchComments merchandise={merch} />
        </>
      )}
    </div>
  );
}
