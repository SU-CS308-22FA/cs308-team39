import React from "react";
import { useSignup } from "../../hooks/useUserSignup";

//import { useHistory } from "react-router-dom";

import { useState } from "react";

// styles
import styles from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { signup, isPending, error, flag } = useSignup();
  //const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, displayName);

    if (await signup(email, password, displayName)) {
      console.log("successfull signup, rerouting to homepage.");
      window.location.href = "/";
    }
    console.log(flag.toString);
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

      {!isPending && <button className="btn">Signup</button>}
      {isPending && <button className="btn">Waiting</button>}
      {flag === 1 && <p>User Added</p>}
      {flag === 0 && <p>{error}</p>}
    </form>
  );
}
