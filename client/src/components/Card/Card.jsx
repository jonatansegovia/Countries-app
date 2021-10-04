import React from 'react';
import { Link } from 'react-router-dom';

import s from './Card.module.css';

export default function Card({ countries, loading, byParams }) {
  loading && <h2>Loading...</h2>;

  return (
    <div>
      <ul className={s.container}>
        {countries.length > 0 &&
          countries.map((c, idx) => (
            <li key={idx}>
              <Link to={`/countries/${c.id}`}>
                <img
                  className={s.img}
                  alt="flag from country"
                  width="400px"
                  heigth="300px"
                  src={c.flag}
                ></img>
              </Link>
              <h2>{c.id}</h2>
              <h2>{c.name}</h2>
              <h2>{c.continent}</h2>
            </li>
          ))}
      </ul>
    </div>
  );
}
