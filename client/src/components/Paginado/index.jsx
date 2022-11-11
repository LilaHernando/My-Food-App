import React from "react";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      {pageNumbers?.map((number) => {
        return (
          <div key={number} onClick={() => paginado(number)}>
            <a>{number}</a>
          </div>
        );
      })}
    </div>
  );
}
