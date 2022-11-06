import React from "react";
import "./App.css";
import Nav from "./react/components/Nav/Nav";
import RecipeCard from "./react/components/RecipeCard/RecipeCard";
import RecipeDetail from "./react/components/RecipeDetail/RecipeDetail";
import CreateRecipe from "./react/components/CreateRecipe/CreateRecipe";

import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path={"/"} component={Nav} />
      <Route exact path={"/recipes"} component={RecipeCard} />
      <Route path={"/recipes/:id"} component={RecipeDetail} />
      <Route path={"/recipecreator"} component={CreateRecipe} />
    </div>
  );
}

export default App;
