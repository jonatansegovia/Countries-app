import React from 'react';
import { Link } from 'react-router-dom';

import s from './Pagination.module.css';

export default function Pagination({
  countriesPerPage,
  totalCountries,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={s['container-pages']}>
      <nav>
        <ul>
          {pageNumbers.map((number) => {
            return (
              <li key={number}>
                <Link to="#" onClick={() => paginate(number)}>
                  {number}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
