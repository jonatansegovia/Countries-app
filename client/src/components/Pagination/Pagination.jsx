import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

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
    <nav className="container-pages">
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
  );
}
