import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetails } from "../../actions/index.js";
import { useParams } from "react-router";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const recipeDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch]);

  console.log("AAAA", recipeDetail);

  return (
    <div>
      <img src={recipeDetail.image} alt="" />
      <h2>{recipeDetail.name}</h2>

      <span>Dish summary : </span>
      {recipeDetail.summary && recipeDetail.summary.replace(/<[^>]*>?/g, "")}
      <br />

      <span>Healthscore : </span>
      <span>{recipeDetail.healthiness}</span>
      <br />

      <span>Type of Diets :</span>
      <span>{recipeDetail.diets && recipeDetail.diets.map((e) => e.name)}</span>
      <br />

      <span>Step by step : </span>
      <span>{recipeDetail.steps}</span>
      <br />
    </div>
  );
}
