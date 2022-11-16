import React from "react";
import "./App.css";
//import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import { Route, Switch } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail/index";
import Home from "./components/Home/index";
import RecipeSearch from "./components/Search/index";
import PostRecipe from "./components/PostRecipe/index";
import Landing from "./components/Landing";
import "./reset.css";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={"/create"} component={PostRecipe} />
        <Route exact path={"/"} component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home" component={RecipeSearch} />
        <Route exact path={"/:id"} component={RecipeDetail} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
