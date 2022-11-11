import {
  FILTER_RECIPE_BY_DIET,
  GET_DIETS,
  GET_RECIPES,
  SORT_BY_SCORE,
  ORDER_BY_TITLE,
  GET_RECIPE_BY_TITLE,
  GET_DETAILS,
  POST_RECIPE,
} from "../actions/const";

const initialState = {
  detalle: [],
  allRecipes: [],
  loadRecipe: [],
  types: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        loadRecipe: action.payload,
      };
    case GET_DIETS: {
      return {
        ...state,
        allDiets: action.payload,
      };
    }
    case FILTER_RECIPE_BY_DIET:
      const allRecipes = state.allRecipes;
      const typeApi = []; //api---> aca tengo guardados los tipos de dieta dela api
      const types = []; // db---> aca tengo guardados los tipos de dieta dela bd
      allRecipes.forEach((e) => {
        if (e.hasOwnProperty("diet") && e.diet.includes(action.payload)) {
          typeApi.push(e);
        }
      });

      allRecipes.forEach((e) => {
        if (
          e.hasOwnProperty("diet") &&
          e.diet.map((t) => t.name === action.payload)
        ) {
          types.push(e);
        }
      });

      const allTypes = typeApi.concat(types);
      if (allTypes?.length) {
        return {
          ...state,
          loadRecipe: allTypes,
        };
      }
    case SORT_BY_SCORE:
      let sortedRecipesScore =
        action.payload === "punAsc"
          ? state.loadRecipe.sort(function (a, b) {
              if (a.healthiness > b.healthiness) {
                return 1;
              }
              if (b.healthiness > a.healthiness) {
                return -1;
              }
              return 0;
            })
          : action.payload === "punDesc"
          ? state.loadRecipe.sort(function (a, b) {
              if (a.healthiness > b.healthiness) {
                return -1;
              }
              if (b.healthiness > a.healthiness) {
                return 1;
              }
              return 0;
            })
          : null;
      return {
        ...state,
        loadRecipe: sortedRecipesScore,
      };
    case ORDER_BY_TITLE:
      let orderTitle =
        action.payload === "asc"
          ? state.allRecipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        loadRecipe: orderTitle,
      };
    case GET_RECIPE_BY_TITLE:
      return {
        ...state,
        loadRecipe: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        detalle: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
