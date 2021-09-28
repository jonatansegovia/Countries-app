import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCountries } from '../actions';
import Card from './Card';

function Home({ countries, getCountries }) {
  // const dispatch = useDispatch(); //mi auto para ir al reducer
  // const allCountries = useSelector((state) => state.countries); //el estado que quiero traerme cuando llegue data
  const [name, setName] = useState('');

  useEffect(() => {
    getCountries();
  }, []);

  const inputHandler = (e) => {
    setName(e.target.value);
  };

  console.log(countries);
  let counterForMap = 0;

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
        {countries &&
          countries.map((c) => {
            while (counterForMap < 9) {
              {
                counterForMap++;
              }
              return (
                <fragment>
                  <Card flag={c.flag} name={c.name} continent={c.capital} />;
                </fragment>
              );
            }
          })}
      </div>
    </div>
    //MOSTRAR 9 PAÍSES
    // PAGINADOOOOOOOOOOOOOOOOOO
  );
}

const mapStateToProps = (state) => {
  return { countries: state.countries, data: state.data };
};

export default connect(mapStateToProps, { getCountries })(Home);
