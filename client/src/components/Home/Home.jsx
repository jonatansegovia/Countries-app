import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCountries,
  getActivities,
  filterByArea,
  filterByAlphabet,
  filterCountryByContinent,
} from '../../actions';

import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import FilterForActivities from '../FilterForActivities/FilterForActivities';

import s from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const countriesFounded = useSelector((state) => state.countries);

  //--PAGINATION
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  useEffect(() => {
    setLoading(true);
    dispatch(getCountries());
    dispatch(getActivities());
    setLoading(false);
    setCountriesPerPage(9);
    /* eslint-disable */
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

  //--HANDLERS

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

  return (
    <div className={s.main}>
      <div className={s.navbar}>
        <SearchBar />
      </div>
      <aside className={s.aside}>
        <label htmlFor="forAlphabet">Search by Alphabet: </label>
        <select
          id="forAlphabet"
          onChange={(e) => handleFilterByAlphabet(e.target.value)}
        >
          <option disabled>---</option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
        </select>
        <label htmlFor="forContinents">Search by Continent: </label>
        <select id="forContinents" onChange={(e) => handleFilterByContinent(e)}>
          <option disabled>---</option>
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
          <option disabled>---</option>
          <option value="ascending">Smallest Countries to Biggest</option>
          <option value="descending">Biggest Countries to Smallest</option>
        </select>
        <FilterForActivities />
      </aside>

      <section className={s.section}>
        {countriesFounded.length > 0 ? (
          <Card countries={currentCountry} loading={loading} />
        ) : (
          <span>Ops! Country not found, try again!</span>
        )}
      </section>
      <div className={s.footer}>
        <Pagination
          countriesPerPage={countriesPerPage}
          totalCountries={countriesFounded.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
