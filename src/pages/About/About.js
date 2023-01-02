import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="Body">
      <h1 className="AboutHeader">We Are The Turkish Football Federation</h1>
      <img
        className="President"
        alt="TFF President"
        src={process.env.PUBLIC_URL + "/President.jpg"}
      ></img>
      <p className="PhotoInfo">
        Mehmet Büyükekşi, the new President of the Turkish Football Federation
      </p>
      <h3 className="AboutInfo">
        The Turkish Football Federation is the governing body of association
        football in Turkey. It was formed on 23 April 1923, and joined FIFA the
        same year and UEFA in 1962. It organizes the Turkey national football
        team, the Turkish Football League and the Turkish Cup
      </h3>
      <h2 className="RecentMatches">Recent Matches:</h2>
      <div className="Matches">
        <img
          className="Match"
          alt="Latest Match Results"
          src={process.env.PUBLIC_URL + "/Match3.jpg"}
        ></img>
        <img
          className="Match"
          alt="Latest Match Results"
          src={process.env.PUBLIC_URL + "/Match2.jpg"}
        ></img>
        <img
          className="Match"
          alt="Latest Match Results"
          src={process.env.PUBLIC_URL + "/Match1.jpg"}
        ></img>
      </div>
    </div>
  );
}
