import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetails } from "../../actions/index.js";
//import styles from "./RecipeDetail.module.css";
import { useParams } from "react-router";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeDetail = useSelector((state) => state.detail);

  console.log(recipeDetail);
  useEffect(() => {
    dispatch(getDetails(id));
  }, [id, dispatch]);

  return (
    <div>
      {recipeDetail.length > 0 ? (
        <div>
          <img src={recipeDetail[0].image} alt="" />

          <div>
            <div>
              <Link to="/home">
                <button>GO BACK </button>
              </Link>
              <h2>{recipeDetail[0].title}</h2>
              <div>
                <div>
                  <span>Dish summary : </span>
                  <span>
                    {" "}
                    {recipeDetail[0].summary &&
                      recipeDetail[0].summary.replace(/<[^>]*>?/g, "")}
                  </span>
                </div>
                <br />
                <div>
                  <span>Healthscore : </span>
                  <span>{recipeDetail[0].healthiness}</span>
                </div>
                <br />
                <span>Type of Diets :</span>

                <span> {recipeDetail[0].diets.map((el) => el + "-  ")} </span>
                <br />
                <br />

                <div>
                  <span>Step by step : </span>
                  <span>{recipeDetail[0]?.steps}</span>
                </div>
                <br />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
