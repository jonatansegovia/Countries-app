import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCountries } from '../actions';
import Card from './Card';

export default function Home() {
  const dispatch = useDispatch(); //mi auto para ir al reducer
  const allCountries = useSelector((state) => state.countries); //el estado que quiero traerme cuando llegue data

  useEffect(() => {
    dispatch(getCountries()); //acá dispatcho la acción de solicitar a la api
  }, []);

  function handleButton(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  console.log(allCountries);

  return (
    <div>
      <h1>{allCountries}</h1>
      <button onClick={handleButton}>CARGAR</button>
      {allCountries.map((c) => {
        return <Card name={c.name}></Card>;
      })}
    </div>
  );
}
