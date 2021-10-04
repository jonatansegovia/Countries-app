import React from 'react';
import { Link } from 'react-router-dom';

import s from './CardById.module.css';

export default function Card({ countries, loading, byParams }) {
  loading && <h2>Loading...</h2>;

  return (
    <div>
      <ul className={s.container}>
        {countries.length > 0 &&
          countries.map((c, idx) => (
            <li key={idx}>
              {byParams !== undefined && (
                <div>
                  <img
                    alt="flag from country"
                    width="350px"
                    heigth="200px"
                    src={c.flag}
                  ></img>
                  <h2>Capital:</h2>
                  <h3>{c.subregion}</h3>
                  <h2>Area of the country:</h2>
                  <h3>
                    {c.area / 1000000} Million {'\u33A2'}
                  </h3>
                </div>
              )}

              {c.activities && c.activities[0] ? (
                c.activities.map((act) => (
                  <div key={act.id}>
                    <label>Activities Created for {c.name}:</label>
                    <p>Name: {act.name}</p>
                    <p>Difficulty: {act.difficulty}</p>
                    <p>Duration: {act.duration} min.</p>
                    <p>Season: {act.season}</p>
                  </div>
                ))
              ) : (
                <div>
                  <p>* This country has not activities created</p>
                  <Link to="/activity">CREATE</Link>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
