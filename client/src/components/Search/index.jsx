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
          placeholder="Search by recipe name"
          value={name}
          onChange={(e) => handleChange(e)}
        />
      </form>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
        </svg>
      </button>
    </div>
  );
}
