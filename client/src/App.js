import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path={"/"} component={Nav} />
      <Route exact path={"/recipes"} component={RecipeCard} />
      <Route path={"/recipes/:id"} component={RecipeDetail} />
      <Route path={"/create"} component={CreateRecipe} />
    </div>
  );
}

export default App;
