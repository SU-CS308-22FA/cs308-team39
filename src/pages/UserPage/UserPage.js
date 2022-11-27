import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import "./UserPage.css";
export default function UserPage() {
  const { user } = useAuthContext();
  const {
    updateError,
    updatePending,
    updateUserName,
    updateUserPassword,
    updateUserEmail,
    updateUserPicture,
    updateUserType,
  } = useUpdateUser();

  const [flag, setFlag] = useState(0);
  const [newUsername, setNewUsername] = useState(user.displayName);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState(user.password);

  const [error, setError] = useState(null);
  const [type, setType] = useState(null);
  const [password, setPassword] = useState(null);
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
        //console.log("doc: ", doc);
        setType(doc.get("type"));
        console.log("type:", doc.get("type"));
        setPassword(doc.get("password"));
        console.log("password:", doc.get("password"));
      };
      fetchData();
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }, []);

  const updateNameHandleSubmit = async (e) => {
    //try to update account name
    e.preventDefault();
    if ((await updateUserName(newUsername)) && !updateError) {
      window.location.href = "/UserPage/" + newUsername;
    }
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    console.log("Document data:", doc.data());
  };
  const updateEmailHandleSubmit = async (e) => {
    //try to update account name
    e.preventDefault();
    if ((await updateUserEmail(newEmail)) && !updateError) {
      window.location.href = "/UserPage/" + newUsername;
    }
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    console.log("Document data:", doc.data());
  };
  const updatePasswordHandleSubmit = async (e) => {
    //try to update account name
    e.preventDefault();
    if ((await updateUserPassword(newPassword)) && !updateError) {
      window.location.href = "/UserPage/" + newUsername;
    }
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    console.log("Document data:", doc.data());
  };

  return (
    <>
      {user && !error && (
        <div id="wrapper">
          <div id="first">
            <p>My Profile</p>
          </div>
          <div id="second">
            <h4>
              Name: {user.displayName}
              {flag === 0 && (
                <button className="btnUserPage" onClick={() => setFlag(1)}>
                  Update
                </button>
              )}
              {flag === 1 && (
                <>
                  <form onSubmit={updateNameHandleSubmit}>
                    <label>
                      <p>New Username:</p>
                      <input
                        type="text"
                        onChange={(e) => setNewUsername(e.target.value)}
                        value={newUsername}
                      />
                    </label>
                    {!updatePending && (
                      <button className="btn">Set Username</button>
                    )}
                    {updateError && <p>{updateError}</p>}
                    {updatePending && (
                      <button className="btn">isPending</button>
                    )}
                  </form>
                  <button className="btn" onClick={() => setFlag(0)}>
                    Cancel
                  </button>
                </>
              )}
            </h4>

            <h4>
              Email: {user.email}
              {flag === 0 && (
                <button className="btnUserPage" onClick={() => setFlag(2)}>
                  Update
                </button>
              )}
              {flag === 2 && (
                <>
                  <form onSubmit={updateEmailHandleSubmit}>
                    <label>
                      <p>New Email:</p>
                      <input
                        type="text"
                        onChange={(e) => setNewEmail(e.target.value)}
                        value={newEmail}
                      />
                    </label>
                    {!updatePending && (
                      <button className="btn">Set Email</button>
                    )}
                    {updateError && <p>{updateError}</p>}
                    {updatePending && (
                      <button className="btn">isPending</button>
                    )}
                  </form>
                  <button className="btn" onClick={() => setFlag(0)}>
                    Cancel
                  </button>
                </>
              )}
            </h4>
            <h4>
              Password: {password}
              {flag === 0 && (
                <button className="btnUserPage" onClick={() => setFlag(3)}>
                  Update
                </button>
              )}
              {flag === 3 && (
                <>
                  <form onSubmit={updatePasswordHandleSubmit}>
                    <label>
                      <p>New Password:</p>
                      <input
                        type="text"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                      />
                    </label>
                    {!updatePending && (
                      <button className="btn">Set Password</button>
                    )}
                    {updateError && <p>{updateError}</p>}
                    {updatePending && (
                      <button className="btn">isPending</button>
                    )}
                  </form>
                  <button className="btn" onClick={() => setFlag(0)}>
                    Cancel
                  </button>
                </>
              )}
            </h4>
            <h4>Account type: {type}</h4>
          </div>
        </div>
      )}
    </>
  );
}
