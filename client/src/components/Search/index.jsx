import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByTitle } from "../../actions/index";

export default function RecipeSearch() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipeByTitle(name));
    setName("");
  }

  console.log(name);
  return (
    <div>
      <form>
        <input
          type="text"
          id="name"
          autoComplete="off"
          placeholder="Search recipe by name"
          value={name}
          onChange={(e) => handleChange(e)}
        />
      </form>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
