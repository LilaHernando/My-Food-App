require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

// const getRecipes =   async (req, res) => {
//   const { name } = req.query;
//   try {
//     let recipe = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}`
//     );
//     if (recipe.results.length === 0) {
//       throw new Error();
//     }
//     res.json(recipe.data);
//   } catch (error) {
//     res
//       .status(404)
//       .json({ message: `Lo siento, aún no tenemos recetas de ${name}` });
//   }
// };
const getApiRecipes = async () => {
  const apiData = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY}`
  );
  const apiRecipes = await apiData.data.map((r) => {
    return {
      name: r.name,
      summary: r.summary,
      healthScore: r.healthScore,
      steps: r.analyzedInstructions.steps.map((step) => step),
    };
  });
  return apiRecipes;
};

const getDbRecipes = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiRecipes = await getApiRecipes();
  const dbRecipes = await getDbRecipes();
  const AllRecipes = apiRecipes.concat(dbRecipes);
  return AllRecipes;
};

const getFilteredRecipes = async (req, res) => {
  const { name } = req.query;
  const recipes = await getAllRecipes();
  if (name) {
    const filteredRecipes = await recipes.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filteredRecipes.length > 0) {
      res.status(200).send(filteredRecipes);
    } else {
      res.status(404).send(`Lo siento, aún no tenemos recetas de ${name}`);
    }
  } else {
    res.status(200).send(recipes);
  }
};

module.exports = {
  //getRecipes,
  getFilteredRecipes,
};
