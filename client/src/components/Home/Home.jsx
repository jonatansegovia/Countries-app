import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCountries, filterByAlphabet, filterByArea } from '../../actions';
import { filterCountryByContinent } from '../../actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';

import './home.css';

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  //--Pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  useEffect(() => {
    setLoading(true);
    dispatch(getCountries());
    setLoading(false);
  }, [setLoading]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = allCountries.slice(
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
  const handleFilterByArea = (value) => {
    dispatch(filterByArea(value));
    setArea(value);
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
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
        </select>

        <label htmlFor="forContinents">Search by Continent: </label>
        <select id="forContinents" onChange={(e) => handleFilterByContinent(e)}>
          <option value="All">All Countries</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Americas">Americas</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Antarctic">Antarctic</option>
        </select>

        <label htmlFor="forArea">Search by Area in Millons {'\u33A2'}: </label>
        <select
          id="forArea"
          onChange={(e) => handleFilterByArea(e.target.value)}
        >
          <label htmlFor="population">Orden por población: </label>
          <option value="ascending">Smallest Countries to Biggest</option>
          <option value="descending">Biggest Countries to Smallest</option>
        </select>

        <label htmlFor="forActivities">Search by Activity: </label>
        <select id="forActivities">
          <option value="All">All Activities</option>
          <option value="Created">Created Activities</option>
          <option value="Saved">Saved Activities</option>
        </select>
        <div>
          <Pagination
            countriesPerPage={countriesPerPage}
            totalCountries={allCountries.length}
            paginate={paginate}
          />
        </div>
        <div>
          <Card countries={currentCountry} loading={loading} />
        </div>
      </div>
    </div>
  );
}
