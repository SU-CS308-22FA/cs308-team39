import React from "react";

import "./Orders.css";
import { useAuthContext } from "../../hooks/useAuthContext"; 
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
import firebase from "firebase";

export default function Orders() {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    let tempOrders = []
    
    useEffect(() => {
        
    
        const unsub = projectFirestore
          .collection("users")
          .doc(user.uid)
          .onSnapshot(async (doc) => {
            if (doc.exists) {

                const a = await projectFirestore.collection("orders").where("team", "==", doc.data().type).get()
                console.log(a)
                console.log(a.docs[0].data())
                const merchIds = []
                a.docs.forEach(element => {
                     merchIds.push(element.data().merchId)
                });

                const b = await projectFirestore.collection("merchandises").where(firebase.firestore.FieldPath.documentId(), 'in', merchIds).get()
                setOrders(b.docs)
                /*a.docs.forEach(async element => {
                    const merch = await projectFirestore.collection("merchandises").doc(element.data().merchId).get()
                    const order = {displayName: element.data().displayName, ...merch.data()}
                    console.log(order)
                    tempOrders.push(order)
                });
                setOrders(tempOrders)*/
            } 
          });
    
        return () => unsub;
      }, []);
      console.log(orders.type)
      
    return(
        <div>
            <div>Orders For {user.displayName}</div>
            {orders.map((order) => (
                <div>
                    <div
							className="cart-product"
							>
							<img className="image"
								src={
									order.data().imageURL
								}
								alt={order.data().title}
							/>
							<div className="product-info">
								<h3>
									{order.data().title}
								</h3>
								<span className="product-price">
									{order.data().price}
									TL
								</span>
							</div>
							
						</div>
                </div>
            ))}
        </div>
        
    )
};