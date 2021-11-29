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
import Cards from '../Cards/Cards';
import Pagination from '../Pagination/Pagination';
import FilterForActivities from '../FilterForActivities/FilterForActivities';
// import FilterByAlphabet from '../FilterByAlphabet/FilterByAlphabet';
// import FilterByContinent from '../FilterByContinent/FilterByContinent';

import s from './Home.module.css';
// import FilterByArea from '../FilterByArea/FilterByArea';

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
    if (pageNumber === 1) {
      setCurrentPage((oldState) => pageNumber + oldState);
    }
    if (pageNumber === -1) {
      setCurrentPage((oldState) => pageNumber + oldState);
    }
  };
  //--

  //--HANDLERS
  const handleFilterByContinent = (e) => {
    dispatch(filterCountryByContinent(e.target.value));
    setCurrentPage(1);
  };
  const [order, setOrder] = useState('');
  const handleFilterByAlphabet = (value) => {
    if (countriesFounded.length > 0) {
      dispatch(filterByAlphabet(value));
      setOrder(value);
      setCurrentPage(1);
    }
  };
  const [area, setArea] = useState('');
  const handleFilterByArea = (e) => {
    dispatch(filterByArea(e.target.value));
    setArea(e.target.value);
    setCurrentPage(1);
  };
  //--

  //--RESTART
  const handleRestart = () => {
    dispatch(getCountries());
    setCurrentPage(1);
    document.getElementById('forContinents').selectedIndex = 0;
    document.getElementById('forActivities').selectedIndex = 0;
    document.getElementById('forArea').selectedIndex = 0;
    document.getElementById('forAlphabet').selectedIndex = 0;
  };
  //--

  return (
    <div className={s.main}>
      <div className={s.navbar}>
        <SearchBar />
      </div>

      <aside className={s.aside}>
        <div className={s['aside-boxes']}>
          <label htmlFor="forAlphabet">Alphabet: </label>
          <select
            id="forAlphabet"
            onChange={(e) => handleFilterByAlphabet(e.target.value)}
          >
            <option selected={true} disabled="disabled">
              ---
            </option>
            <option value="ascending">A-Z</option>
            <option value="descending">Z-A</option>
          </select>
        </div>
        <div className={s['aside-boxes']}>
          <label htmlFor="forContinents">Continent: </label>
          <select
            id="forContinents"
            onChange={(e) => handleFilterByContinent(e)}
          >
            <option selected={true} disabled="disabled">
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
        </div>
        <div className={s['aside-boxes']}>
          <label htmlFor="forArea">Area: </label>
          <select id="forArea" onChange={(e) => handleFilterByArea(e)}>
            <option selected={true} disabled="disabled">
              ---
            </option>
            <option value="ascending">Smallest Countries to Biggest</option>
            <option value="descending">Biggest Countries to Smallest</option>
          </select>
        </div>
        <FilterForActivities />
        <button type="reset" onClick={handleRestart}>
          RESET
        </button>
      </aside>

      <section className={s.section}>
        {countriesFounded.length > 0 ? (
          <Cards countries={currentCountry} loading={loading} />
        ) : (
          <span className={s.message}>Ops! Country not found, try again!</span>
        )}
      </section>

      <div className={s.footer}>
        <Pagination
          countriesPerPage={countriesPerPage}
          currentPage={currentPage}
          paginate={paginate}
          totalCountries={countriesFounded}
        />
      </div>
    </div>
  );
}
