const { Router } = require("express");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getDiets,
} = require("../controllers/controllers.js");

//const { getAllRecipes,} = require("../controllers/Recipe")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/recipes", getAllRecipes);
router.get("/recipes/:id", getRecipeById);
router.post("/recipes", createRecipe);
router.get("/diets", getDiets);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
