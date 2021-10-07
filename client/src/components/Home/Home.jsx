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
import FilterByAlphabet from '../FilterByAlphabet/FilterByAlphabet';
import FilterByContinent from '../FilterByContinent/FilterByContinent';

import s from './Home.module.css';
import FilterByArea from '../FilterByArea/FilterByArea';

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
  //--

  //--RESTART
  const handleRestart = () => {
    dispatch(getCountries());
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
          <FilterByAlphabet handleFilterByAlphabet={handleFilterByAlphabet} />
        </div>
        <div className={s['aside-boxes']}>
          <FilterByContinent
            handleFilterByContinent={handleFilterByContinent}
          />
        </div>
        <div className={s['aside-boxes']}>
          <FilterByArea handleFilterByArea={handleFilterByArea} />
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
          totalCountries={countriesFounded.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
