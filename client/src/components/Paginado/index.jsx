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
          <div key={number} onClick={() => paginado(number)}>
            <button className={s.pageButton}>{number}</button>
          </div>
        );
      })}
    </div>
  );
}
