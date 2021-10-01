import React from 'react';

import './Card.css';

export default function Card({ countries, loading, byParams }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="container">
      {countries.map((c, idx) => (
        <li key={idx}>
          <img
            alt="flag from country"
            width="350px"
            heigth="200px"
            src={c.flag}
          ></img>
          <h2>{c.id}</h2>
          <h2>{c.name}</h2>
          <h2>{c.continent}</h2>
          {byParams !== undefined && (
            <div>
              <h2>{countries[0].subregion}</h2>
              <h2>
                {countries[0].area / 1000000} Million {'\u33A2'}
              </h2>
              <h2>Touristic Activities Proximamente</h2>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
