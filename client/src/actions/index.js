import axios from "axios";
import {
  GET_RECIPES,
  GET_DIETS,
  FILTER_RECIPE_BY_DIET,
  SORT_BY_SCORE,
  ORDER_BY_TITLE,
  GET_RECIPE_BY_TITLE,
  GET_DETAILS,
  POST_RECIPE,
} from "./const";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const allRecipes = await axios.get(`http://localhost:3001/recipes`);
      return dispatch({
        type: GET_RECIPES,
        payload: allRecipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    try {
      const allDiets = await axios.get(`http://localhost:3001/diets`);
      return dispatch({
        type: GET_DIETS,
        payload: allDiets.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterRecipeByDiet(payload) {
  return {
    type: FILTER_RECIPE_BY_DIET,
    payload,
  };
}

export function sortByScore(payload) {
  return {
    type: SORT_BY_SCORE,
    payload,
  };
}

export function orderByTitle(payload) {
  return {
    type: ORDER_BY_TITLE,
    payload,
  };
}

export function getRecipeByTitle(name) {
  return async function (dispatch) {
    try {
      const recipesTitles = await axios.get(
        `http://localhost:3001/recipes?name=` + name
      );
      return dispatch({
        type: GET_RECIPE_BY_TITLE,
        payload: recipesTitles.data,
      });
    } catch (error) {
      alert("does not exist");
      console.log("error");
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: detail.data,
      });
    } catch (error) {
      console.log("error");
    }
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    try {
      const recipe = await axios.post(`http://localhost:3001/recipes`, payload);

      return dispatch({
        type: POST_RECIPE,
        payload: recipe.data,
      });
    } catch (error) {
      console.log("no se pudo cargar");
    }
  };
}
