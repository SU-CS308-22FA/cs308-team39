import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdLocalShipping } from "react-icons/md"
import "./Orders.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
import firebase from "firebase";

export default function Orders() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [CustomerOrders, setCustomerOrders] = useState([]);
  const [DeliverOrders, setDeliverOrders] = useState([]);
  const [effect, setEffect] = useState(false);

  const [userType, setUserType] = useState("customer");
  const getUserType = async () => {
    try {
      const userRef = projectFirestore.collection("users").doc(user.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", doc.data().type);
      }
      setUserType(doc.data().type);
    } catch (err) {
      console.log("Merch List User isnull");
    }
  };
  let tempOrders = [];
  const deleteProduct = async (e, id) => {
    e.preventDefault();
    try {
      var doc = await projectFirestore
        .collection("orders")
        .doc(orders.at(id).id);
      doc.delete();
      console.log("deleted id:", id, "orders.atid.id", orders.at(id).id);
      setEffect(!effect);
    } catch (err) {
      console.log("DELETE ERR:", err);
    }
  };
  const addToOnDeliver = async (e, id) => {
    e.preventDefault();
    try {
      var ref = await projectFirestore
        .collection("orders")
        .doc(orders.at(id).id)
      const doc = await ref.get();
      const res = await projectFirestore.collection("deliver").add(doc.data())
      ref.delete();
      
      console.log("deleted id:", id, "orders.atid.id", orders.at(id).id);
      setEffect(!effect);
    } catch (err) {
      console.log("DELETE ERR:", err);
    }
  };
  useEffect(() => {
    const unsub = projectFirestore
      .collection("users")
      .doc(user.uid)
      .onSnapshot(async (doc) => {
        if (doc.exists) {
          const a = await projectFirestore
            .collection("orders")
            .where("team", "==", doc.data().type)
            .get();
          console.log("orders is empty", a.empty);
          if (doc) {
            try {
              const myorders = [];
              firebase
                .database()
                .ref("/orders")
                .on("value", function (snapshot) {
                  console.log(snapshot.val());
                });
              const a = await projectFirestore
                .collection("orders")
                .where("team", "==", doc.data().type)
                .get();
              a.forEach((doc) => {
                const b = doc.data();
                b.id = doc.id;
                myorders.push(b);
              });
              setOrders(myorders);
              console.log("orderlar:", myorders);
            } catch (error) {
              setOrders([]);
            }
          }
        }
      });
    //CUSTOMER PART_______
    projectFirestore
      .collection("users")
      .doc(user.uid)
      .onSnapshot(async (doc) => {
        if (doc.exists) {
          const a = await projectFirestore
            .collection("orders")
            .where("customer", "==", user.uid)
            .get();
          console.log("orders is empty", a.empty);
          if (doc) {
            try {
              const myCorders = [];
              firebase
                .database()
                .ref("/orders")
                .on("value", function (snapshot) {
                  console.log(snapshot.val());
                });
              const a = await projectFirestore
                .collection("orders")
                .where("customer", "==", user.uid)
                .get();
              a.forEach((doc) => {
                const b = doc.data();
                b.id = doc.id;
                myCorders.push(b);
              });
              setCustomerOrders(myCorders);
              console.log("orderlar:", myCorders);
            } catch (error) {
              setCustomerOrders([]);
            }
          }
        }
      });
    //CUSTOMER PART ^^^^^^

    //DELIVER PART_______
    
    var where1 = "placeholder"
    projectFirestore
      .collection("users")
      .doc(user.uid)
      .onSnapshot(async (doc) => {
        if (doc.exists) {

          const docType = doc.data().type
          console.log(userType)
          if(docType == "customer" || docType === null){
            where1 =  "customer"
          } else {
            where1 = "team"
          }
          
          console.log("where1 = ", where1)
          const where2 = where1 == "customer" ? user.uid : docType
          console.log("where 2: ", where2)
          const a = await projectFirestore
            .collection("deliver")
            .where(where1, "==", where2)
            .get();
          console.log("deliver is empty", a.empty);
          if (doc) {
            try {
              const mydelivers = [];
              firebase
                .database()
                .ref("/deliver")
                .on("value", function (snapshot) {
                  console.log(snapshot.val());
                });
              const a = await projectFirestore
                .collection("deliver")
                .where(where1, "==", where2)
                .get();
              a.forEach((doc) => {
                const b = doc.data();
                b.id = doc.id;
                mydelivers.push(b);
              });
              setDeliverOrders(mydelivers);
              console.log("deliverlar:", mydelivers);
            } catch (error) {
              setDeliverOrders([]);
            }
          }
        }
      });
      //DELIVER PART ^^^^^^

    getUserType();
    return () => unsub;
  }, [effect]);
  console.log(orders.type);

  return (
    <div>
      {(userType !== "customer" && userType !== "" && userType!==null) && (
        <div>
          <div style={{ margin: 20, marginLeft: 100 }}>
            <p style={{ fontSize: 35 }}>Orders For {user.displayName}</p>
          </div>
          {orders.map((order, i) => (
            <div key={i}>
              <div className="cart-product">
                <img
                  className="image"
                  style={{ height: 100, marginRight: 31 }}
                  src={order.imageURL}
                  alt={order.title}
                />
                <div className="product-info">
                  <h2 style={{ fontWeight: "bold" }}>{order.title}</h2>
                  <p
                    style={{ color: "green", fontWeight: "bold" }}
                    className="product-price"
                  >
                    {order.price * order.quantity}
                    TL
                  </p>
                  <p className="product-price"> quantity: {order.quantity}</p>
                </div>

                <div className="product-info">
                  <p>customer id: {order.customer}</p>
                  <p>customer name: {order.address.namesurname}</p>
                  <p>customer address: {order.address.content}</p>
                </div>
                <div>
                  <button
                    className="btn remove-btn"
                    onClick={(e) => {
                      deleteProduct(e, i);
                    }}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
                <div>
                  <button
                    className="btn deliver-btn"
                    onClick={(e) => {
                      addToOnDeliver(e, i);
                    }}
                  >
                    <MdLocalShipping/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {
        /*(userType === "customer" || user.type === "") &&*/ <div>
          <div style={{ margin: 20, marginLeft: 100 }}>
            <p style={{ fontSize: 35 }}>My Orders</p>
          </div>
          {CustomerOrders.map((order, i) => (
            <div key={i}>
              <div className="cart-product">
                <img
                  className="image"
                  style={{ height: 100, marginRight: 31 }}
                  src={order.imageURL}
                  alt={order.title}
                />
                <div className="product-info">
                  <h2 style={{ fontWeight: "bold" }}>{order.title}</h2>
                  <p
                    style={{ color: "green", fontWeight: "bold" }}
                    className="product-price"
                  >
                    {order.price * order.quantity}
                    TL
                  </p>
                  <p className="product-price"> quantity: {order.quantity}</p>
                </div>

                <div className="product-info">
                  <p>customer id: {order.customer}</p>
                  <p>customer name: {order.address.namesurname}</p>
                  <p>customer address: {order.address.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      {
        /*(userType === "customer" || user.type === "") &&*/ <div>
          <div style={{ margin: 20, marginLeft: 100 }}>
            <p style={{ fontSize: 35 }}>Orders On Shipping</p>
          </div>
          {DeliverOrders.map((order, i) => (
            <div key={i}>
              <div className="cart-product">
                <img
                  className="image"
                  style={{ height: 100, marginRight: 31 }}
                  src={order.imageURL}
                  alt={order.title}
                />
                <div className="product-info">
                  <h2 style={{ fontWeight: "bold" }}>{order.title}</h2>
                  <p
                    style={{ color: "green", fontWeight: "bold" }}
                    className="product-price"
                  >
                    {order.price * order.quantity}
                    TL
                  </p>
                  <p className="product-price"> quantity: {order.quantity}</p>
                </div>

                <div className="product-info">
                  <p>customer id: {order.customer}</p>
                  <p>customer name: {order.address.namesurname}</p>
                  <p>customer address: {order.address.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
