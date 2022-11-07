import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/home"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/recipes"}>Recipes</NavLink>
        </li>
        <li>
          <NavLink to={"/create"}>Create Recipes</NavLink>
        </li>
      </ul>
    </nav>
  );
}
