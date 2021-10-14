import React from 'react';

import s from './CardById.module.css';

export default function CardById(props) {
  const { name, img, continent, id, capital, subregion, area } = props;

  return (
    <div className={s['container-CountryDetail']}>
      <div>
        <img
          alt="flag from country"
          width="350px"
          heigth="200px"
          src={img}
        ></img>
      </div>
      <div className={s['container-countryDetail__details']}>
        <h2>Name:</h2>
        <h3>{name}</h3>
        <h2>Continent:</h2>
        <h3>{continent}</h3>
        <h2>Id:</h2>
        <h3>{id}</h3>
        <h2>Capital:</h2>
        <h3>{capital}</h3>
        <h2>Subregion:</h2>
        <h3>{subregion}</h3>
        <h2>Area of the country:</h2>
        <h3>
          {area} Million {'\u33A2'}
        </h3>
      </div>
    </div>
  );
}
