import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import "react-phone-input-2/lib/style.css";
import "./UserPage.css";

export default function UserPage() {
  const { user } = useAuthContext();
  const {
    updateError,
    settUpdateError,
    updatePending,
    updatePhone,
    updateUserName,
    updateUserPassword,
    updateUserEmail,
    updateUserPicture,
    updateUserType,
  } = useUpdateUser();
  const [newUsername, setNewUsername] = useState(user.displayName);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState(user.password);
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState(
    user.password
  );
  const [newType, setNewType] = useState("");
  const [newPic, setNewPic] = useState(null);
  const [key, setKey] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [pic, setPic] = useState(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const [pictureError, setPictureError] = useState(null);

  useEffect(() => {
    setError(null);
    try {
      console.log("loading profile page");
      console.log("uid: ", user.uid);
      const fetchData = async () => {
        const userRef = projectFirestore.collection("users").doc(user.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data());
        }
        //console.log("doc: ", doc);
        setPic(doc.get("pic"));
        setNewPhone(doc.get("phone"));
        setNewType(doc.get("type"));
        setNewPassword(doc.get("password"));
        setNewPasswordConfirmation(doc.get("password"));
      };
      fetchData();
      console.log("Got user data.");
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }, []);
  const addPhoneSpaces = (phoneNumber) => {
    const number = phoneNumber.trim().replace(/[^0-9]/g, "");

    if (number.length < 4) return setNewPhone(number);
    if (number.length < 7)
      return setNewPhone(number.replace(/(\d{3})(\d{1})/, "$1-$2"));
    if (number.length < 11)
      return setNewPhone(number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3"));
    return setNewPhone(number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
  };
  const updateNameHandleSubmit = async (e) => {
    //try to update account newUsername
    e.preventDefault();
    if (await updateUserName(newUsername)) {
      return true;
    } else {
      return false;
    }
  };
  const updateEmailHandleSubmit = async (e) => {
    //try to update account newEmail
    e.preventDefault();
    if (await updateUserEmail(newEmail)) {
      return true;
    } else {
      return false;
    }
  };
  const updatePasswordHandleSubmit = async (e) => {
    //try to update account newPassword
    setError(null);
    e.preventDefault();
    if (
      newPasswordConfirmation === newPassword &&
      (await updateUserPassword(newPassword))
    ) {
      return true;
    } else if (newPasswordConfirmation !== newPassword) {
      setError("Passwords don't match.");
      return false;
    }
    return false;
  };
  const updatePhoneHandleSubmit = async (e) => {
    //try to update account newType
    e.preventDefault();
    if (await updatePhone(newPhone)) {
      return true;
    } else {
      return false;
    }
  };
  const updateTypeHandleSubmit = async (e) => {
    //try to update account newType
    e.preventDefault();
    if (await updateUserType(newType, key)) {
      return true;
    } else {
      return false;
    }
  };
  const updatePictureHandleSubmit = async (e) => {
    e.preventDefault();
    if (
      newPic !== null &&
      !pictureError &&
      (await updateUserPicture(newPic, key))
    ) {
      window.location.href = "/UserPage/" + newUsername;
    }
  };
  const handleOnUpdate = async (e) => {
    if (
      (await updateNameHandleSubmit()) &&
      (await updateEmailHandleSubmit()) &&
      (await updatePasswordHandleSubmit()) &&
      (await updatePhoneHandleSubmit()) &&
      (await updateTypeHandleSubmit())
    ) {
      window.location.href = "/UserPage/" + newUsername;
    }
  };
  return (
    <>
      <h1 align="center">User Information</h1>
      {user && (
        <div id="wrapper">
          {/*Profile Picture (First)*/}
          {
            <div id="first">
              <img className="profilePic" src={pic} alt="ProfilePicture"></img>
            </div>
          }
          <div id="second">
            {/*picture update*/}
            <form onSubmit={updatePictureHandleSubmit}>
              <label>
                <p>New Picture:</p>
                <input type="file" onChange={handleFileChange} />
              </label>
              {pictureError !== null && <p>{pictureError}</p>}
              {!updatePending && !pictureError && (
                <button className="btn">Upload Picture</button>
              )}
            </form>

            <form onSubmit={handleOnUpdate}>
              {/*Display Name*/}
              <div>
                <label>
                  <p>Username:</p>
                  <input
                    type="text"
                    onChange={(e) => setNewUsername(e.target.value)}
                    value={newUsername}
                  />
                </label>
                {/*Email*/}
                <label>
                  <p>Email:</p>
                  <input
                    type="email"
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                  />
                </label>
                {/*Password*/}
                <label>
                  <p>Password:</p>
                  <input
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                  <p>Please write password again:</p>
                  <input
                    type="password"
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    value={newPasswordConfirmation}
                  />
                </label>
                {/*Type*/}
                <label>
                  <p>Type:</p>
                  <input
                    type="text"
                    onChange={(e) => setNewType(e.target.value)}
                    value={newType}
                  />
                  <p>Official Key:</p>
                  <input
                    type="text"
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                  />
                </label>
                {/*Phone*/}
                <label>
                  <p>Set Phone:</p>
                  <input
                    type="tel"
                    maxLength="12"
                    onChange={(e) => addPhoneSpaces(e.target.value)}
                    value={newPhone}
                  />
                </label>
                {!updatePending && (
                  <button className="btnwide">
                    Update Account Information
                  </button>
                )}
                {updateError && <p>{updateError}</p>}
                {updatePending && (
                  <button className="btnwide">isPending</button>
                )}
              </div>
            </form>
            {/*picture update*/}
            <form onSubmit={updatePictureHandleSubmit}>
              <label>
                <p>New Picture:</p>
                <input type="file" onChange={handleFileChange} />
              </label>
              {pictureError !== null && <p>{pictureError}</p>}
              {!updatePending && !pictureError && (
                <button className="btn">Upload Picture</button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
