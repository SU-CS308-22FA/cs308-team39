import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="Body">
      <img
        className="TFF"
        alt="TFF Building"
        src={process.env.PUBLIC_URL + "/TFF.jpg"}
      ></img>
      <h1 className="DearCustomer">
        Dear Customer, You Can Contact Us Through The Following Means
      </h1>
      <div className="Info">
        <h3 className="ContactHeader">Local:</h3>
        <li className="ContactList">
          Telephone : + 0090 0 216 554 51 00 + 0090 0 216 554 51 01{" "}
        </li>
        <li className="ContactList"> Fax: + 0090 216 319 19 45 </li>
        <li className="ContactList">E-Mail: iletisim@tff.org</li>
        <li className="ContactList">
          Address :Hasan Doğan Milli Takımlar Kamp ve Eğitim Tesisleri
          Riva/Beykoz/İstanbul
        </li>
        <h3 className="ContactHeader">International:</h3>
        <li className="ContactList">Telephone : + 0090 216 554 57 30</li>
        <li className="ContactList"> Fax: + 0090 216 319 19 45 </li>
        <li className="ContactList">E-Mail: intdept@tff.org</li>
        <li className="ContactList">
          Address : HHasan Doğan Milli Takımlar Kamp ve Eğitim Tesisleri
          Riva/Beykoz/İstanbul
        </li>
      </div>
      <a href="https://goo.gl/maps/CzBqTgjCMLassxSK7">
        <img className="Map" src={process.env.PUBLIC_URL + "/Map.jpg"}></img>
      </a>
    </div>
  );
}
