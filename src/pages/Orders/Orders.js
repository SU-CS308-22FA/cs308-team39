import React from "react";

import "./Orders.css";
import { useAuthContext } from "../../hooks/useAuthContext"; 
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

export default function Orders() {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState();
    
    useEffect(() => {
        
    
        const unsub = projectFirestore
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              console.log(doc.data().type)
            } 
          });
    
        return () => unsub;
      }, []);

    return(
        <div>Orders For {user.displayName}</div>
    )
};