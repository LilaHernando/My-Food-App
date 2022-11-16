import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  filterRecipeByDiet,
  sortByScore,
  orderByTitle,
} from "../../actions/index";
import RecipeCard from "../RecipeCard/index";
import Paginado from "../Paginado/index";
import RecipeSearch from "../Search/index";
import s from "./home.module.css";

//--------------------------------------------------------------

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.loadRecipe);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const [order, setOrder] = useState("");
  const lastRecipe = currentPage * recipesPerPage;
  const firstRecipe = lastRecipe - recipesPerPage;
  const currentRecipes = allRecipes?.slice(firstRecipe, lastRecipe);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handleFilterDiets(e) {
    e.preventDefault();
    dispatch(filterRecipeByDiet(e.target.value));
  }

  function handleScore(e) {
    e.preventDefault();
    dispatch(sortByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered ${e.target.value}`);
  }

  function handleTitle(e) {
    e.preventDefault();
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered ${e.target.value}`);
  }

  return (
    <div className={s.mainWrapper}>
      <div className={s.blur}>
        <section className={s.contentWrapper}>
          <div className={s.headerWrapper}>
            <h1 className={s.title}>Find the best recipe to cook</h1>

            <div className={s.createButtonWrapper}>
              <Link to="/create">
                <button>Create new recipe +</button>
              </Link>
            </div>
          </div>
          <div className={s.searchInput}>
            <RecipeSearch />
          </div>
          <div className={s.filteredContent}>
            <div className={s.filters}>
              <h2 className={s.filterTitle}>Filter</h2>
              <select
                className={s.filter}
                onChange={(e) => {
                  handleFilterDiets(e);
                }}
              >
                <option value="all"> Filter by type of diet</option>
                <option value="gluten free">Gluten free</option>
                <option value="ketogenic">ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto-vegetarian">Lacto-vegetarian</option>
                <option value="paleo">Paleolithic</option>
                <option value="ovo-vegetarian">Ovo-vegetarian</option>
                <option value="low fodmap">Low fodmap</option>
                <option value="pescetarian">Pescetarian</option>
                <option value="vegan">Vegan</option>
                <option value="primal">Primal</option>
                <option value="whole 30">Whole 30</option>
                <option value="dairy free">Dairy free</option>
                <option value="lacto ovo vegetarian">
                  Lacto ovo vegetarian
                </option>
                <option value="fodmap friendly">Fodmap friendly</option>
              </select>

              <select
                className={s.filter}
                onChange={(e) => {
                  handleScore(e);
                }}
              >
                <option hidden disabled selected value>
                  by HealthScore
                </option>
                <option value="punAsc">Heigher</option>
                <option value="punDesc">Lower</option>
              </select>

              <select className={s.filter} onChange={(e) => handleTitle(e)}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option hidden disabled selected value>
                  by Alphabeth
                </option>
              </select>
            </div>
            <div className={s.cardsContainer}>
              {currentRecipes ? (
                currentRecipes.map((recipe) => {
                  return (
                    <div key={recipe.id}>
                      <RecipeCard
                        className={s.card}
                        id={recipe.id}
                        name={recipe.name}
                        image={recipe.image}
                        diets={recipe.diets}
                      />
                    </div>
                  );
                })
              ) : (
                <h2></h2>
              )}
            </div>
          </div>
          <div className={s.paginado}>
            <Paginado
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes.length}
              paginado={paginado}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
