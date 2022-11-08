require("dotenv").config();

const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { Diet, Recipe, Recipe_Diet } = require("../db");
const { API_KEY } = process.env;

async function createRecipe(req, res) {
  let { name, summary, diets, healthScore, image, steps } = req.body;

  let recipeCreated = await Recipe.create({
    id: uuidv4(),
    name,
    summary,
    healthScore,
    steps,
    image: image
      ? image
      : "https://d320djwtwnl5uo.cloudfront.net/recetas/cover/lengu_ZD3bVmkQ8iTdnfGLw41PSOheWt0sHB.png",
  });
  let typeDietDb = await Diet.findAll({
    where: { name: diets },
  });

  recipeCreated.addDiet(typeDietDb);
  res.send("type of diet created!");
}
//------------------------------------------------------------------------------------------------------------
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.includes("-")) {
      const dbData = await Recipe.findOne({
        where: { id },
        include: Diet,
      });
      res.json(dbData);
    } else {
      let apiData = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const { title, image, summary, healthScore, diets } = apiData.data;

      apiData = {
        name: title,
        image: image,
        summary: summary.replace(/<[^>]*>?/g, ""),
        healthScore: healthScore,
        diets: diets,
      };
      res.json(apiData);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//------------------------------------------------------------------------------------------------------------
const getAllRecipes = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      let apiData = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=100&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      apiData = apiData.data.results.map((r) => {
        return {
          id: r.id,
          name: r.title,
          image: r.image,
          diets: r.diets,
        };
      });
      const dbData = await Recipe.findAll({
        where: { name },
        include: Diet,
      });
      const allData = dbData.concat(apiData);
      if (allData.length === 0) {
        throw new Error(`Lo siento, aún no tenemos recetas con ${name}`);
      }
      res.status(200).json(allData);
    } else {
      let apiData = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      apiData = apiData.data.results.map((r) => {
        return {
          id: r.id,
          name: r.title,
          image: r.image,
          diet: r.diets,
        };
      });
      const dbData = await Recipe.findAll({
        include: Diet,
      });
      const allData = dbData.concat(apiData);
      res.status(200).json(allData);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//-----------------------------------------------------------------------------------------------------------
let allDiets = [
  { name: "gluten free" },
  { name: "dairy free" },
  { name: "lacto ovo vegetarian" },
  { name: "vegan" },
  { name: "paleolithic" },
  { name: "primal" },
  { name: "pescatarian" },
  { name: "fodmap friendly" },
  { name: "whole 30" },
];
async function getDiets(req, res) {
  try {
    const response = await Diet.findAll();
    if (response.length > 0) return res.json(response);
    else {
      try {
        const dietDb = await Diet.bulkCreate(allDiets);
        return res.json(dietDb);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getDiets,
};
