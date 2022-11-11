import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ name, diets, image, id }) {
  return (
    <div>
      <div>
        <Link to={`/${id}`}>
          <img src={image} />
          <div>
            <h2>{name}</h2>
            <div>
              <div>
                <strong>Diet: </strong>
                <p>{diets + " "}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
