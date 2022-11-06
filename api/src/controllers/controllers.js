require("dotenv").config();
const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;

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
          diet: r.diets,
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
//-----------------------------------------------------------------------------------------------------------------------
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
        diet: diets,
      };
      res.json(apiData);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//-----------------------------------------------------------------------------------------------------------------------
const createRecipe = async (req, res) => {
  try {
    const { name, image, summary, steps, healthScore, diet } = req.body;

    let newRecipe = await Recipe.create(
      {
        name,
        image,
        summary,
        steps,
        healthScore,
        diet,
      },
      {
        include: { model: Diet },
      }
    );

    const allDiets = [];
    for (let i = 0; i < diet.length; i++) {
      let matchDiet = await Diet.findOne({ where: { name: diet[i] } });
      allDiets.push(matchDiet);
    }
    await newRecipe.addDiets(allDiets);
    newRecipe = await Recipe.findOne({
      where: { name },
      include: Diet,
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//-----------------------------------------------------------------------------------------------------------------------

const getDiets = (req, res) => {
  const apiDiets = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto vegetarian",
    "ovo vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
    "primal",
    "low fodmap",
    "whole 30",
  ];
  apiDiets.map(async (d) => await Diet.create({ name: d }));

  res.status(201).json("Dieta agregada con éxito!");
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getDiets,
};
