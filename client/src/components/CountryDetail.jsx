import React from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';

import { getCountryByParams } from '../actions';

function CountryDetail({ country, getCountryByParams }) {
  const { idPais } = useParams();

  useEffect(() => {
    getCountryByParams(idPais);
  }, []);

  //   console.log(idPais);
  //   console.log(country);
  return <div>{country.name}</div>;
}

const mapStateToProps = (state) => {
  return { country: state.country };
};

export default connect(mapStateToProps, { getCountryByParams })(CountryDetail);
