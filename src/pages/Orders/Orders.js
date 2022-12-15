import React from "react";

import "./Orders.css";
import { useAuthContext } from "../../hooks/useAuthContext"; 
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

export default function Orders() {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([{displayName: String},]);
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
                /*const merchIds = []
                a.docs.forEach(element => {
                     merchIds.push(element.data().merchId)
                });*/



                a.docs.forEach(async element => {
                    const merch = await projectFirestore.collection("merchandises").doc(element.data().merchId).get()
                    const order = {displayName: element.data().displayName, ...merch.data()}
                    console.log(order)
                    tempOrders.push(order)
                });
                setOrders(tempOrders)
            } 
          });
    
        return () => unsub;
      }, []);
      console.log(orders.type)
      
    return(
        <div>
            <div>Orders For {user.displayName}</div>
            {tempOrders.map((order) => (
                <div>
                    <p>{order.displayName}</p>
                    <p>{order.title}</p>
                    <p>{order.imageURL}</p>
                </div>
            ))}
        </div>
        
    )
};