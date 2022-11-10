import React from "react";
import "./App.css";
//import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import { Route, Switch } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail/index";
import Home from "./components/Home/index";
import RecipeSearch from "./components/Search/index";
import CreateRecipe from "./components/CreateRecipe/index";

function App() {
  return (
    <React.Fragment>
      <Switch>
        {/* <Route path={"/"} component={} /> */}
        <Route path="/home" exact component={Home} />
        <Route path="/home" exact component={RecipeSearch} />
        <Route path={"/:id"} exact component={RecipeDetail} />
        <Route path={"/"} exact component={CreateRecipe} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
