import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <h1>
      Welcome!
      <Link to="/home">
        <button className="button">Get Started</button>
      </Link>
    </h1>
  );
}
