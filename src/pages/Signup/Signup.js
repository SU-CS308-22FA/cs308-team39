import React from "react";

import { useHistory } from "react-router-dom";

import { useState } from "react";
import { projectFirestore } from "../../firebase/config";
// styles
import styles from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [flag, setFlag] = useState(0);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName);

    projectFirestore
      .collection("users")
      .add({ email: email, password: password, username: displayName })
      .then(() => {
        setFlag(1);
        //history.push("/home");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>sign up</h2>
      <label>
        <span>email:</span>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>password:</span>

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <label>
        <span>username:</span>

        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      <button className="btn">Sign up</button>
      {flag === 1 && <p>User Added</p>}
    </form>
  );
}
