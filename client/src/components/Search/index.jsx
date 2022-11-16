import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByTitle } from "../../actions/index";
import s from "./search.module.css";

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

  return (
    <div>
      <form className={s.formWrapper}>
        <input
          className={s.searchInput}
          type="text"
          id="name"
          autoComplete="off"
          placeholder="Search recipe by name"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <button
          className={s.searchButton}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
      </form>
    </div>
  );
}
