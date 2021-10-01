import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getCountries,
  getActivities,
  filterByArea,
  filterByAlphabet,
  filterCountryByContinent,
  filterByActivity,
} from '../../actions';

import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';

import './home.css';

export default function Home() {
  const dispatch = useDispatch();
  const countriesFounded = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  //--Pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  useEffect(() => {
    setLoading(true);
    dispatch(getCountries());
    dispatch(getActivities());
    setLoading(false);
    setCountriesPerPage(9);
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = countriesFounded.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //--

  //--Handlers
  const handleFilterByContinent = (e) => {
    dispatch(filterCountryByContinent(e.target.value));
  };

  const [order, setOrder] = useState('');
  const handleFilterByAlphabet = (value) => {
    dispatch(filterByAlphabet(value));
    setOrder(value);
  };

  const [area, setArea] = useState('');
  const handleFilterByArea = (e) => {
    dispatch(filterByArea(e.target.value));
    setArea(e.target.value);
  };

  const handleFilterByActivity = (act) => {
    dispatch(filterByActivity(act));
  };

  //RESTART
  const handleRestart = () => {
    dispatch(getCountries());
  };
  //--
  return (
    <div>
      <SearchBar />
      <div>
        <label htmlFor="forAlphabet">Search by Alphabet: </label>
        <select
          id="forAlphabet"
          onChange={(e) => handleFilterByAlphabet(e.target.value)}
        >
          <option disabled selected value>
            ---
          </option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
        </select>

        <label htmlFor="forContinents">Search by Continent: </label>
        <select id="forContinents" onChange={(e) => handleFilterByContinent(e)}>
          <option disabled selected value>
            ---
          </option>
          <option value="All">All Countries</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Americas">Americas</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Antarctic">Antarctic</option>
        </select>

        <label htmlFor="forArea">Search by Area in Millons {'\u33A2'}: </label>
        <select id="forArea" onChange={(e) => handleFilterByArea(e)}>
          <option disabled selected value>
            ---
          </option>
          <option value="ascending">Smallest Countries to Biggest</option>
          <option value="descending">Biggest Countries to Smallest</option>
        </select>
        {/* //ARREGLAR ESE DE ARRIBA, NO TRAE NADA */}

        <label htmlFor="forActivities">Search Activities: </label>
        <select
          name="activity"
          id="forActivities"
          onChange={(e) => handleFilterByActivity(e.target.value)}
        >
          <option disabled selected value>
            ---
          </option>
          {/* renderizado de actividades */}
          {allActivities.length > 0 &&
            allActivities.map((act) => (
              <option key={act.id} value={act.name}>
                {act.name}
              </option>
            ))}
        </select>
        <button onClick={handleRestart}>RESTART</button>
        <div>
          <Pagination
            countriesPerPage={countriesPerPage}
            totalCountries={countriesFounded.length}
            paginate={paginate}
          />
        </div>
        <div>
          {countriesFounded.length > 0 ? (
            <Card countries={currentCountry} loading={loading} />
          ) : (
            <span>Ops! Country not found, try again!</span>
          )}
        </div>
      </div>
    </div>
  );
}
