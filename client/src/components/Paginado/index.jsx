import React from "react";
import s from "./paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumbers = [];
  const totalPages = allRecipes / recipesPerPage;

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={s.buttonsContainer}>
      {pageNumbers?.map((number) => {
        return (
          <div
            className={s.pageButton}
            key={number}
            onClick={() => paginado(number)}
          >
            <a>{number}</a>
          </div>
        );
      })}
    </div>
  );
}
