import React from "react";
import { Link } from "react-router-dom";
import s from "./recipecard.module.css";

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
      <div className={s.cardContainer}>
        <Link to={`/${id}`}>
          <img className={s.recipeImg} src={image} />
          <div className={s.infoContainer}>
            <h2 className={s.recipeName}>{name}</h2>
            <div className={s.dietTypeContainer}>
              <p className={s.dietType}>{checkedDiets}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
