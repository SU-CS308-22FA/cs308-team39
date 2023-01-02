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
      <h1>Dear Customer, You Can Contact Us Through The Following Means</h1>
      <div className="Info">
        <h3>Local:</h3>
        <li>Telephone : + 0090 0 216 554 51 00 + 0090 0 216 554 51 01 </li>
        <li> Fax: + 0090 216 319 19 45 </li>
        <li>E-Mail: iletisim@tff.org</li>
        <li>
          Address :Hasan Doğan Milli Takımlar Kamp ve Eğitim Tesisleri
          Riva/Beykoz/İstanbul
        </li>
        <h3>International:</h3>
        <li>Telephone : + 0090 216 554 57 30</li>
        <li> Fax: + 0090 216 319 19 45 </li>
        <li>E-Mail: intdept@tff.org</li>
        <li>
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
