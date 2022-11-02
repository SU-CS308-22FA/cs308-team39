import React from "react";
import { Link } from "react-router-dom";
// styles
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>group39</li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}