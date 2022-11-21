import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";

export default function UserPage() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    setError(null);
    try {
      console.log("loading profile page");
      console.log("user id:", user.uid);
      const fetchData = async () => {
        const userRef = projectFirestore.collection("users").doc(user.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data());
        }
        console.log("doc: ", doc);
        setType(doc.get("type"));
        console.log("type:", doc.get("type"));
      };
      fetchData();
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }, []);
  const handleClick = async () => {
    //try to update account type
    try {
      await projectFirestore.collection("users").doc(user.uid).update({
        type: "Type updated",
      });
    } catch (err) {
      console.log("MY ERR: ", err.message);
      setError(err.message);
    }
  };
  return (
    <>
      {user && type && (
        <>
          <h1>My Profile:</h1>
          <h4>Name: {user.displayName}</h4>
          <h4>Email: {user.email}</h4>
          <h4>Password: {user.password}</h4>
          <h4>Account type: {type}</h4>
          <button onClick={handleClick}>Update account type</button>
          {error && <p>{error}</p>}
        </>
      )}
    </>
  );
}
