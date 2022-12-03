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
  const [flag, setFlag] = useState(-1);
  const [newUsername, setNewUsername] = useState(user.displayName);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState(user.password);
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [newType, setNewType] = useState("");
  const [newPic, setNewPic] = useState(null);
  const [key, setKey] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [pic, setPic] = useState(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [pictureError, setPictureError] = useState(null);
  const [password, setPassword] = useState("");
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
        setPhone(doc.get("phone"));
        setType(doc.get("type"));
        setPassword(doc.get("password"));
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
      window.location.href = "/UserPage/" + newUsername;
    }
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    console.log("Document data:", doc.data());
  };
  const updateEmailHandleSubmit = async (e) => {
    //try to update account newEmail
    e.preventDefault();
    if (await updateUserEmail(newEmail)) {
      window.location.href = "/UserPage/" + newUsername;
    }
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    console.log("Document data:", doc.data());
  };
  const updatePasswordHandleSubmit = async (e) => {
    //try to update account newPassword
    setError(null);
    e.preventDefault();
    if (
      newPasswordConfirmation === newPassword &&
      (await updateUserPassword(newPassword))
    ) {
      window.location.href = "/UserPage/" + newUsername;
    }
    if (newPasswordConfirmation !== newPassword) {
      setError("Passwords don't match.");
    }
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    console.log("Document data:", doc.data());
  };
  const updatePhoneHandleSubmit = async (e) => {
    //try to update account newType
    e.preventDefault();
    if (await updatePhone(newPhone)) {
      window.location.href = "/UserPage/" + newUsername;
    }
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    console.log("Document data:", doc.data());
  };
  const updateTypeHandleSubmit = async (e) => {
    //try to update account newType
    e.preventDefault();
    if (await updateUserType(newType, key)) {
      window.location.href = "/UserPage/" + newUsername;
    }
    const userRef = projectFirestore.collection("users").doc(user.uid);
    const doc = await userRef.get();
    console.log("Document data:", doc.data());
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
  const handleFileChange = (e) => {
    setNewPic(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setPictureError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setPictureError("Selected file must be an image");
      return;
    }
    if (selected.size > 500000) {
      setPictureError("Image file size must be less than 500kb");
      return;
    }

    setPictureError(null);
    setNewPic(selected);
    console.log("image updated");
  };
  let handleOnChange = (value) => {
    setPhone(value);
  };

  let handleOnChangephone = (e) => {
    setPhone(e.target.value);
  }; /*
  let handleOnPhoneChange = (value) => {
    setNewPhone(value);
  };
*/
  let handleOnPhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  return (
    <>
      <h1 align="center">User Information</h1>
      {user && (
        <div id="wrapper">
          {/*Profile Picture (First)*/}
          {((flag === -1 || flag === 0 || flag === 5) && (
            <div id="first">
              <img className="profilePic" src={pic} alt="ProfilePicture"></img>
              <div>
                {flag === 0 && (
                  <button className="btnPic" onClick={() => setFlag(5)}>
                    Update
                  </button>
                )}
              </div>
            </div>
          )) || <div id="dummydiv"></div>}
          <div id="second">
            {(flag === 0 && (
              <h4 className="fadein" align="center">
                Please Select
              </h4>
            )) || <br></br>}
            {{
              /*picture update*/
            } &&
              flag === 5 && (
                <>
                  <form onSubmit={updatePictureHandleSubmit}>
                    <label>
                      <p>New Picture:</p>
                      <input type="file" onChange={handleFileChange} />
                    </label>
                    {pictureError !== null && <p>{pictureError}</p>}
                    {!updatePending && !pictureError && (
                      <button className="btn">Upload Picture</button>
                    )}

                    {updateError && <p>{updateError}</p>}
                    {updatePending && (
                      <button className="btn">isPending</button>
                    )}
                  </form>
                  <button
                    className="btn"
                    onClick={() => {
                      setFlag(0);
                      settUpdateError(null);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            {/*Display Name*/}
            {(flag === -1 || flag === 0 || flag === 1) && (
              <h4>
                Name: {user.displayName}
                {/*flag === 0 && (
                  <button className="btnUserPage" onClick={() => setFlag(1)}>
                    Update
                  </button>
                )*/}
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
                    <button
                      className="btn"
                      onClick={() => {
                        setFlag(0);
                        settUpdateError(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </h4>
            )}
            {/*Email*/}
            {(flag === -1 || flag === 0 || flag === 2) && (
              <h4>
                Email: {user.email}
                {/*flag === 0 && (
                  <button className="btnUserPage" onClick={() => setFlag(2)}>
                    Update
                  </button>
                )*/}
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
                    <button
                      className="btn"
                      onClick={() => {
                        setFlag(0);
                        settUpdateError(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </h4>
            )}
            {/*Password*/}
            {(flag === -1 || flag === 0 || flag === 3) && (
              <h4>
                Password: {"*".repeat(password.length)}
                {/*flag === 0 && (
                  <button className="btnUserPage" onClick={() => setFlag(3)}>
                    Update
                  </button>
                )*/}
                {flag === 3 && (
                  <>
                    <form onSubmit={updatePasswordHandleSubmit}>
                      <label>
                        <p>New Password:</p>
                        <input
                          type="password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          value={newPassword}
                        />
                        <p>Please write again:</p>
                        <input
                          type="password"
                          onChange={(e) =>
                            setNewPasswordConfirmation(e.target.value)
                          }
                          value={newPasswordConfirmation}
                        />
                      </label>
                      {!updatePending && (
                        <button className="btn">Set Password</button>
                      )}
                      {error && <p>{error}</p>}
                      {!error && updateError && <p>{updateError}</p>}
                      {updatePending && (
                        <button className="btn">isPending</button>
                      )}
                    </form>
                    <button
                      className="btn"
                      onClick={() => {
                        setFlag(0);
                        settUpdateError(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </h4>
            )}
            {/*Type*/}
            {(flag === -1 || flag === 0 || flag === 4) && (
              <h4>
                Account type: {type}
                {/*flag === 0 && (
                  <button className="btnUserPage" onClick={() => setFlag(4)}>
                    Update
                  </button>
                )*/}
                {flag === 4 && (
                  <>
                    <form onSubmit={updateTypeHandleSubmit}>
                      <label>
                        <p>New Type:</p>
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
                      {!updatePending && (
                        <button className="btn">Set Type</button>
                      )}
                      {updateError && <p>{updateError}</p>}
                      {updatePending && (
                        <button className="btn">isPending</button>
                      )}
                    </form>
                    <button
                      className="btn"
                      onClick={() => {
                        setFlag(0);
                        settUpdateError(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </h4>
            )}
            {/*Phone*/}
            {(flag === -1 || flag === 0 || flag === 6) && (
              <h4>
                Phone: {phone}
                {/*flag === 0 && (
                  <button className="btnUserPage" onClick={() => setFlag(6)}>
                    Update
                  </button>
                )*/}
                {flag === 6 && (
                  <>
                    <form onSubmit={updatePhoneHandleSubmit}>
                      <label>
                        <p>Set Phone:</p>
                        <input
                          type="tel"
                          maxlength="12"
                          onChange={(e) => addPhoneSpaces(e.target.value)}
                          value={newPhone}
                        />
                      </label>
                      {!updatePending && (
                        <button className="btn">Set Phone</button>
                      )}
                      {updateError && <p>{updateError}</p>}
                      {updatePending && (
                        <button className="btn">isPending</button>
                      )}
                    </form>
                    <button
                      className="btn"
                      onClick={() => {
                        setFlag(0);
                        settUpdateError(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </h4>
            )}
          </div>
          <div id="third">
            <br></br>
            {flag === 0 && (
              <button className="btnUserPage" onClick={() => setFlag(1)}>
                Update
              </button>
            )}
            {flag === 0 && (
              <button className="btnUserPage" onClick={() => setFlag(2)}>
                Update
              </button>
            )}
            {flag === 0 && (
              <button className="btnUserPage" onClick={() => setFlag(3)}>
                Update
              </button>
            )}
            {flag === 0 && (
              <button className="btnUserPage" onClick={() => setFlag(4)}>
                Update
              </button>
            )}{" "}
            {flag === 0 && (
              <button className="btnUserPage" onClick={() => setFlag(6)}>
                Update
              </button>
            )}
          </div>

          <div id="fourth">
            {flag === -1 && (
              <button className="btnUserPage" onClick={() => setFlag(0)}>
                Update
              </button>
            )}
            {flag === 0 && (
              <button className="btnUserPage" onClick={() => setFlag(-1)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
