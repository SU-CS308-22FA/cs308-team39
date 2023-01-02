import React, { useState, useEffect } from "react";
//import "./ShoppingCart.css";
import { RadioGroup, RadioButton } from "react-radio-buttons";
//import { AiFillCloseCircle } from "react-icons/ai";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import "./Checkout.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore, timestamp } from "../../firebase/config";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const history = useHistory();
  const { user } = useAuthContext();
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedKey, setSelectedKey] = useState(null);
  const [addresses, setAddresses] = useState([]);
  /**
   * This function gets the addresses object of the user from the database.
   */
  const getAddresses = async () => {
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", doc.data().addresses);
    }
    setAddresses(doc.data().addresses);
  };

  const checkout = async (e) => {
    e.preventDefault();

    products.forEach(async (productItem) => {
      const order = {
        team: productItem.team,
        displayName: user.displayName,
        merchId: productItem.id, //undefined
        quantity: productItem.quantity, //undefined
        customer: user.uid,
        address: addresses.at(selectedAddress),
      };
      console.log("checked out orders:", order);
      /*await projectFirestore.collection("orders").add(order);
      await projectFirestore
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .add(order);*/
    });

    /*await projectFirestore.collection("carts").doc(user.uid).delete();*/

    //history.push("/checkout");
  };

  const deleteProduct = (id) => {
    projectFirestore
      .collection("carts")
      .doc(user.uid)
      .update({ merchIds: firebase.firestore.FieldValue.arrayRemove(id) });

    console.log("deleted id:", id);
    //const index = myArray.indexOf(2);
    //const x = myArray.splice(index, 1);
  };

  useEffect(() => {
    const unsub = projectFirestore
      .collection("carts")
      .doc(user.uid)
      .onSnapshot(async (doc) => {
        if (doc) {
          //console.log(doc.data().merchIds);
          try {
            firebase
              .database()
              .ref("/merchandises")
              .on("value", function (snapshot) {
                console.log(snapshot.val());
              });
            const a = await projectFirestore
              .collection("merchandises")
              .where(
                firebase.firestore.FieldPath.documentId(),
                "in",
                doc.data().merchIds
              )
              .get();
            const myorders = [];
            a.forEach((doc) => {
              console.log("doc:", doc, "docid:", doc.id, "=>", doc.data());
              const b = doc.data();
              b.quantity = 1;
              b.id = doc.id;
              myorders.push(b);
            });
            setProducts(myorders);
            //setProducts(a.docs);
          } catch (error) {
            setProducts([]);
          }
          console.log("Products: ", products);
        }
      });
    console.log("selected address is", selectedAddress);
    getAddresses();
    console.log("selectedOpt.prdct:", selectedKey);
    if (selectedKey != null) {
      console.log("PRODUCTS:", products);
      const updatedOrder = {
        imageURL: products.at(selectedKey).imageURL,
        title: products.at(selectedKey).title,
        team: products.at(selectedKey).team,
        displayName: user.displayName,
        merchId: products.at(selectedKey).id,
        quantity: selectedOption,
        customer: user.uid,
        address: addresses.at(selectedAddress),
        price: products.at(selectedKey).price,
      };
      console.log("update amount");
      products[selectedKey] = updatedOrder;
    }
    return () => unsub;
  }, [selectedAddress, selectedKey]);

  return (
    <div /*className="modal"*/>
      <form>
        <div className="orders-checkout">
          <div className="header">
            <h2>Items</h2>
          </div>
          {products && (
            <div className="cart-products">
              {products.length === 0 && (
                <span className="empty-text">Nothing to checkout.</span>
              )}
              {products.map((productItem, i) => (
                <div key={i} className="cart-product">
                  <img src={productItem.imageURL} alt={productItem.title} />
                  <div className="product-info">
                    <h3>{productItem.title}</h3>
                    <span className="product-price">
                      {productItem.price}
                      TL
                    </span>
                  </div>
                  <select
                    name="amount"
                    onChange={(event) => {
                      console.log(event.target.name, event.target.value);
                      console.log("key:", i);
                      setSelectedKey(i);
                      setSelectedOption(event.target.value);
                    }}
                    /*inputProps={{
                      amount: "amount",
                      product: "product",
                    }}*/
                    className="count"
                    value={productItem.count}
                  >
                    {[...Array(10).keys()].map((number) => {
                      const num = number + 1;
                      return (
                        <option value={num} key={num}>
                          {num}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className="btn remove-btn"
                    onClick={() => deleteProduct(productItem.id)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="orders-checkout">
          <div className="header">
            <h2>Select Delivery Address</h2>
          </div>
          {addresses && (
            <div className="addresses-checkout">
              <RadioGroup onChange={(e) => setSelectedAddress(e)}>
                {addresses.map((address, i) => (
                  <RadioButton
                    key={i}
                    rootColor="gray"
                    pointColor="navy"
                    id={i}
                    name="address"
                    value={i.toString()}
                  >
                    <div key={i}>
                      <div>
                        <h4>{address.title}</h4>
                        <h3>{address.content}</h3>
                      </div>
                    </div>
                  </RadioButton>
                ))}
              </RadioGroup>
            </div>
          )}
          {products.length > 0 && (
            <button className="btn confirm-btn" onClick={checkout}>
              Confirm Order
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
