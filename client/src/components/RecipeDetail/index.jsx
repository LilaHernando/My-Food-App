import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../../actions/index.js";
import { useParams } from "react-router";
import s from "./recipedetail.module.css";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  let checkedDiets = [];
  function verifyDiet(recipeDetail, id) {
    if (id.includes("-")) {
      recipeDetail.diets.map((e) => checkedDiets.push(e.name + " "));
    } else {
      checkedDiets = recipeDetail.diets;
    }
  }
  verifyDiet(recipeDetail, id);

  return (
    <div className={s.mainWrapper}>
      <div className={s.blur}>
        <section className={s.contentWrapper}>
          <h2 className={s.title}>{recipeDetail.name}</h2>
          <div className={s.recipeImgContainer}>
            <img className={s.recipeImg} src={recipeDetail.image} alt="" />
          </div>

          <span className={s.subtitle}>Dish summary</span>
          <div className={s.summaryContainer}>
            {recipeDetail.summary &&
              recipeDetail.summary.replace(/<[^>]*>?/g, "")}
          </div>
          <br />

          <span className={s.subtitle}>Healthscore:</span>
          <div className={s.hsContainer}>
            <span>{recipeDetail.healthiness}</span>
          </div>
          <br />

          <span className={s.subtitle}>Type of Diet:</span>
          <div className={s.typeContainer}>
            <span>{checkedDiets}</span>
          </div>
          <br />

          <span className={s.subtitle}>Step by step:</span>
          <div className={s.stepsContainer}>
            <span>{recipeDetail.steps}</span>
          </div>
          <br />
        </section>
      </div>
    </div>
  );
}
