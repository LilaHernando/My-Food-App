import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ name, diets, image, id }) {
  return (
    <div>
      <div>
        <img src={image} />
        <div>
          <Link to={`/${id}`}>
            <h2>{name}</h2>
          </Link>
          <div>
            <div>
              <strong>Diets : </strong>
              <p>{diets + " "}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
