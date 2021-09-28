import React from 'react';

import './Card.css';

export default function Card({ countries, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul class="container">
      {countries.map((c) => (
        <li key={c.id}>
          <img
            alt="flag from country"
            width="350px"
            heigth="200px"
            src={c.flag}
          ></img>
          <h2>{c.name}</h2>
          <h2>{c.continent}</h2>
        </li>
      ))}
    </ul>
  );
}
