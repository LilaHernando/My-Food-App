const { Router } = require("express");
const {
  //getRecipes
  getFilteredRecipes,
} = require("../controllers/controllers.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/recipes", getFilteredRecipes);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
