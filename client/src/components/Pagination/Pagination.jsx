import React from 'react';
import { Link } from 'react-router-dom';

import s from './Pagination.module.css';

export default function Pagination({
  countriesPerPage,
  currentPage,
  totalCountries,
  paginate,
}) {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalCountries.length / countriesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className={s['container-pages']}>
      <nav className={s['container-pages__nav']}>
        {currentPage !== 1 ? (
          <button
            className={s['container-pages__btn']}
            onClick={() => paginate(-1)}
          >
            PREV
          </button>
        ) : (
          <span></span>
        )}
        <p>{currentPage}</p>
        {currentPage !== pageNumbers.length ? (
          <button
            className={s['container-pages__btn']}
            onClick={() => paginate(1)}
          >
            NEXT
          </button>
        ) : (
          <span></span>
        )}
      </nav>
    </div>
  );
}
