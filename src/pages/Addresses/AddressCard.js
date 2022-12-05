import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";
//import { useFirestore } from "../../hooks/useFirestore";
import "./AddressCard.css";
import { type } from "@testing-library/user-event/dist/type";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [nameSurname, setNameSurname] = useState("");

  const [pageState, setPageState] = useState(0);
  console.log("AddressCard");
  const { user } = useAuthContext();
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
  useEffect(() => {
    getAddresses();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();

    console.log("handle on submit");
    const addressToAdd = {
      content: address,
      namesurname: nameSurname,
      title: title,
    };

    try {
      await projectFirestore
        .collection("users")
        .doc(user.uid)
        .update({
          addresses: [...addresses, addressToAdd],
        }); /* DELETER CODE
      addresses.splice(1, 1);
      await projectFirestore.collection("users").doc(user.uid).update({
        addresses: addresses,
      });*/
      console.log("handle on update end");
      setPageState(0);
      getAddresses();
    } catch (err) {
      console.log("Add Address Error: ", err.message);
    }
  };

  return (
    <>
      {pageState === 0 && (
        <div>
          <h1 align="center">Addresses</h1>
          <ul>
            {addresses.map((address, i) => (
              <div key={i} className="wrapper-address">
                <div className="first">
                  <h4>{address.title}</h4>
                  <h3>{address.content}</h3>
                </div>
                <div className="second">
                  <button className="deletebutton">Delete</button>
                  <button className="deletebutton">Update</button>
                </div>
              </div>
            ))}
          </ul>
          <button
            onClick={(e) => {
              setPageState(1);
            }}
            className="btnwide"
          >
            Add Address
          </button>
        </div>
      )}
      {pageState === 1 && (
        <div className="formwrap">
          <h4 align="center">Add Address</h4>
          <form onSubmit={handlesubmit}>
            <p>
              Address Title
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></input>
            </p>
            <p>
              Address
              <textarea
                className="addressInput"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></textarea>
            </p>
            <p>
              Name Surname
              <input
                type="text"
                onChange={(e) => setNameSurname(e.target.value)}
                value={nameSurname}
              ></input>
            </p>
            <button className="btnwide">Add Address</button>
          </form>
        </div>
      )}
    </>
  );
}
//learn hearth button here.
//https://codepen.io/Zaku/pen/gOrjOGp
