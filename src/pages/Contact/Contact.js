import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="Body">
      <h1>Dear Customer, You Can Contact Us Through The Following Means</h1>
      <img
        className="President"
        alt="TFF President"
        src={process.env.PUBLIC_URL + "/President.jpg"}
      ></img>
      <p>
        Mehmet Büyükekşi, the new President of the Turkish Football Federation
      </p>
      <h3>
        The Turkish Football Federation is the governing body of association
        football in Turkey. It was formed on 23 April 1923, and joined FIFA the
        same year and UEFA in 1962. It organizes the Turkey national football
        team, the Turkish Football League and the Turkish Cup
      </h3>
      <a href="https://goo.gl/maps/CzBqTgjCMLassxSK7">
        <img className="Map" src={process.env.PUBLIC_URL + "/Map.jpg"}></img>
      </a>
    </div>
  );
}
