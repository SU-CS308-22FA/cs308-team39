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
  const [totalPrice, setTotalPrice] = useState(0);
  const [pageState, setPageState] = useState(0);
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
    if (selectedAddress !== null) {
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
        await projectFirestore.collection("orders").add(order);
      });
      await projectFirestore.collection("carts").doc(user.uid).delete();
      setPageState(1);
      //history.push("/checkout");
    }
  };

  const deleteProduct = async (e, id) => {
    e.preventDefault();
    try {
      products.pop(id);
      const myarr = [];
      for (let i = 0; i < products.length; i++) {
        myarr.push(products.at(i).id);
      }
      console.log("PRODUCTids:", myarr);
      await projectFirestore
        .collection("carts")
        .doc(user.uid)
        .update({ merchIds: myarr });

      console.log("deleted id:", id);
    } catch (err) {
      console.log("DELETE ERR:", err);
    }
  };

  useEffect(() => {
    const unsub = projectFirestore
      .collection("carts")
      .doc(user.uid)
      .onSnapshot(async (doc) => {
        if (doc && selectedKey == null) {
          //console.log(doc.data().merchIds);
          try {
            const myorders = [];
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
            setTotalPrice(0);
            var p = 0;
            a.forEach((doc) => {
              const b = doc.data();
              b.id = doc.id;
              b.quantity = 1;
              myorders.push(b);
              p = p + b.quantity * b.price;
              console.log(
                "p",
                p,
                "doc:",
                doc,
                "docid:",
                doc.id,
                "=>",
                doc.data()
              );
            });
            setTotalPrice(p);
            setProducts(myorders);
          } catch (error) {
            setProducts([]);
          }
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
    console.log(products.length, "Products: ", products);
    setTotalPrice(0);
    var p = 0;
    for (let i = 0; i < products.length; i++) {
      p = p + products.at(i).quantity * 1 * products.at(i).price * 1;
    }
    setTotalPrice(p);
    return () => unsub;
  }, [selectedAddress, selectedKey, selectedOption]);

  return (
    <div /*className="modal"*/>
      {pageState === 0 && (
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
                        {productItem.quantity !== 1 &&
                          " x " +
                            productItem.quantity +
                            ": " +
                            productItem.price * productItem.quantity +
                            "TL"}
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
                      onClick={(e) => {
                        deleteProduct(e, i);
                      }}
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                ))}
                <h4 style={{ alignSelf: "flex-end", padding: "20px" }}>
                  Total Price:{totalPrice}
                </h4>
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
      )}
    </div>
  );
}
