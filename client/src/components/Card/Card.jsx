import React from 'react';
import { Link } from 'react-router-dom';

import s from './Card.module.css';

export default function Card({ key, img, id, name, continent }) {
  return (
    <div className={s['container-cards']}>
      <li key={key}>
        <Link to={`/countries/${id}`}>
          <img
            className={s['container-cards__img']}
            alt="flag from country"
            src={img}
          ></img>
        </Link>
        <h2>{id}</h2>
        <h2>{name}</h2>
        <h2>{continent}</h2>
      </li>
    </div>
  );
}
