import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCountries } from '../actions';
import Card from './Card';
import Pagination from './Pagination';

function Home({ countries, getCountries }) {
  const [name, setName] = useState('');

  //--Pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  useEffect(() => {
    setLoading(true);
    getCountries();
    setLoading(false);
  }, [setLoading]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //--

  const inputHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Link to="/Countries">Countries List</Link>
      <button
        onClick={(e) => {
          inputHandler(e);
        }}
        type="text"
      >
        Reload Countries
      </button>
      <h1>Welcome to Countries App</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(event) => {
          inputHandler(event);
        }}
      />
      <button>Search</button>
      <div>
        <select>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="area">Area of the Country</option>
        </select>
        <select>
          <option value="cont">Continent</option>
          <option value="act">Activities</option>
        </select>
        <div>
          <Card countries={currentCountry} loading={loading} />
        </div>
        <div>
          <Pagination
            countriesPerPage={countriesPerPage}
            totalCountries={countries.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { countries: state.countries };
};

export default connect(mapStateToProps, { getCountries })(Home);
