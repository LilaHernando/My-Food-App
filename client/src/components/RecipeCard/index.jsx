import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ name, diets, image, id }) {
  const checkedDiets = [];

  const verifyDiet = (diets) => {
    if (typeof diets[0] === "object") {
      diets.map((e) => checkedDiets.push(e.name + " "));
    } else {
      diets.map((e) => checkedDiets.push(e));
    }
  };

  verifyDiet(diets);

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
                <p>{checkedDiets}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
