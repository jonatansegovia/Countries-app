import React from 'react';

import Card from '../Card/Card';

import s from './Cards.module.css';

export default function Cards({ countries, loading }) {
  loading && <h2>Loading...</h2>;

  return (
    <div>
      <ul className={s.container}>
        {countries.length > 0 &&
          countries.map((c, idx) => (
            <Card
              key={idx}
              idx={idx}
              img={c.flag}
              id={c.id}
              name={c.name}
              continent={c.continent}
            />
          ))}
      </ul>
    </div>
  );
}
