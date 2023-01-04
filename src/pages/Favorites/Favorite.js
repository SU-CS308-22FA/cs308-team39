import React, { useState, useEffect } from "react";
import "./Favorite.css";
import { AiFillCloseCircle } from "react-icons/ai";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Favorite() {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const { user } = useAuthContext();

  const handleClick = () => {
    history.push("/");
  };

  const deleteProduct = (id) => {
    projectFirestore
      .collection("favorites")
      .doc(user.uid)
      .update({ merchIds: firebase.firestore.FieldValue.arrayRemove(id) });

    console.log(id);
    //const index = myArray.indexOf(2);
    //const x = myArray.splice(index, 1);
  };

  useEffect(() => {
    const unsub = projectFirestore
      .collection("favorites")
      .doc(user.uid)
      .onSnapshot(async (doc) => {
        if (doc) {
          //console.log(doc.data().merchIds)
          try {
            const a = await projectFirestore
              .collection("merchandises")
              .where(
                firebase.firestore.FieldPath.documentId(),
                "in",
                doc.data().merchIds
              )
              .get();
            //console.log(a.docs[1].data().title)
            setProducts(a.docs);
          } catch (error) {
            setProducts([]);
          }
        }
      });

    return () => unsub;
  }, []);

  return (
    <div className="modal">
      <div className="favoriteList">
        <div className="header">
          <h2>Favorites</h2>
          <button className="btn close-btn" onClick={handleClick}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        {products && (
          <div className="cart-favorites">
            {products.length === 0 && (
              <span className="empty-text">
                Your favorites are currently empty
              </span>
            )}
            {products.map((product) => (
              <div className="cart-favorite">
                <img src={product.data().imageURL} alt={product.data().title} />
                <div className="favorite-info">
                  <h3>{product.data().title}</h3>
                  <span className="favorite-price">
                    {product.data().price}
                    TL
                  </span>
                </div>
                <Link className="RedirectBtn" to={`/merch/${product.id}`}>
                  More
                </Link>
                <button
                  className="UnFavBtn"
                  onClick={() => deleteProduct(product.id)}
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
