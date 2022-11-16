import React from "react";
import { useState } from "react";

import { useLogin } from "../../hooks/useUserSignin";

//import { useHistory } from "react-router-dom";

// styles
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signin, isPending, error, flag } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>login</h2>
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
      {!isPending && <button className="btn">Login</button>}
      {isPending == 1 && <button className="btn">Waiting</button>}
      {flag === 1 && <p>Login successfull</p>}
      {flag === 0 && <p>{error}</p>}
    </form>
  );
}
