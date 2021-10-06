import React from 'react';
import { Link } from 'react-router-dom';

import CardById from '../CardById/CardById';
import CardActivities from '../CardActivities/CardActivities';

import s from './CardsById.module.css';

export default function CardsById({ countries, loading, byParams }) {
  loading && <h2>Loading...</h2>;

  return (
    <div>
      {countries.length > 0 &&
        countries.map((c, idx) => (
          <div className={s.container}>
            <div className={s['container-innerId']} key={idx}>
              {byParams !== undefined && (
                <CardById
                  key={idx}
                  img={c.flag}
                  name={c.name}
                  continent={c.continent}
                  id={c.id}
                  capital={c.capital}
                  subregion={c.subregion}
                  area={c.area / 1000000}
                />
              )}
            </div>
            <div className={s['container-innerActivity']}>
              {c.activities && c.activities[0] ? (
                c.activities.map((act, idx) => (
                  <CardActivities
                    key={idx}
                    name={act.name}
                    difficulty={act.difficulty}
                    duration={act.duration}
                    season={act.season}
                  />
                ))
              ) : (
                <div className={s['btn-container']}>
                  <p className={s['btn-container']}>
                    * This country has not activities created
                  </p>
                  <Link className={s['btn-create']} to="/activity">
                    CREATE
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
