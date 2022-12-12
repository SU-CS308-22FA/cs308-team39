import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";
import "./AddressCard.css";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [updating, setUpdating] = useState(-1);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [nameSurname, setNameSurname] = useState("");

  const [pageState, setPageState] = useState(0);
  console.log("AddressCard");
  const { user } = useAuthContext();

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

  /**
   * Every time the page loads, this function gets called.
   * The getAddresses function is inside for getting the current
   * addresses each time.
   */
  useEffect(() => {
    getAddresses();
  }, []);

  /**
   * This function deletes the e th address from the addresses array
   * then updates the addresses array for the user in the database
   * @param {number} e the index of the deleted address object
   */
  const handleButtonDelete = async (e) => {
    //e.preventDefault();
    console.log("handle delete button");
    try {
      addresses.splice(e, 1);
      await projectFirestore.collection("users").doc(user.uid).update({
        addresses: addresses,
      });
      console.log("handle on delete end");
      setPageState(0);
      getAddresses();
    } catch (err) {
      console.log("Delete Address Error: ", err.message);
    }
  };

  /**
   * This function fills the input boxes with the e th address object's values
   * and it changes to the adding state with updating value set to e.
   * When the updating value is different then -1, the add button will
   * become update button and the form submit will also change to handleAddAddressForUpdate
   * from handleAddAddress.
   * @param {number} e
   */
  const handleUpdateAddress = async (e) => {
    setUpdating(e);
    setPageState(1);
    //e.preventDefault();
    console.log("handle update address");
    const addressToChange = addresses[e];

    setAddress(addressToChange.content);
    setNameSurname(addressToChange.namesurname);
    setTitle(addressToChange.title);
    console.log(addressToChange);
  };

  /**
   * Creates a new address object from the filled inputs
   * updates the user.addresses in the database with the new address added.
   * If the user didnt had any addresses before it creates a new addresses array
   * If the user already had addresses it adds the new address to it.
   * @param {form} e used for preventing default inputs.
   */
  const handleAddAddress = async (e) => {
    e.preventDefault();
    console.log("handle on add submit");
    const addressToAdd = {
      content: address,
      namesurname: nameSurname,
      title: title,
    };
    try {
      if (!addresses) {
        await projectFirestore
          .collection("users")
          .doc(user.uid)
          .update({
            addresses: [addressToAdd],
          });
        setPageState(0);
        getAddresses();
        setAddress("");
        setNameSurname("");
        setTitle("");
      } else {
        await projectFirestore
          .collection("users")
          .doc(user.uid)
          .update({
            addresses: [...addresses, addressToAdd],
          });
        setPageState(0);
        getAddresses();
        setAddress("");
        setNameSurname("");
        setTitle("");
      }
    } catch (err) {
      console.log("Add Address Error: ", err.message);
      setAddress("");
      setNameSurname("");
      setTitle("");
    }
  };
  const handleAddAddressForUpdate = async (e) => {
    e.preventDefault();
    console.log("handleAddAddressForUpdate");
    const addressToUpdate = {
      content: address,
      namesurname: nameSurname,
      title: title,
    };
    addresses[updating] = addressToUpdate;
    try {
      await projectFirestore.collection("users").doc(user.uid).update({
        addresses: addresses,
      });
    } catch (err) {
      console.log("AddUpdate Address Error: ", err.message);
    }
    setAddress("");
    setNameSurname("");
    setTitle("");
    setPageState(0);
    setUpdating(-1);
  };
  return (
    <>
      {pageState === 0 && (
        <div>
          <h1 align="center">Addresses</h1>
          <ul>
            {addresses &&
              addresses.map((address, i) => (
                <div key={i} className="wrapper-address">
                  <div className="first">
                    <h4>{address.title}</h4>
                    <h3>{address.content}</h3>
                  </div>
                  <div className="second">
                    <button
                      onClick={(e) => {
                        handleButtonDelete(i);
                      }}
                      className="deletebutton"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        handleUpdateAddress(i);
                      }}
                      className="deletebutton"
                    >
                      Update
                    </button>
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
          <form
            onSubmit={
              updating > -1 ? handleAddAddressForUpdate : handleAddAddress
            }
          >
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
            <button className="btnwide">
              {updating > -1 ? "Update" : "Add Address"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
//learn hearth button here.
//https://codepen.io/Zaku/pen/gOrjOGp
