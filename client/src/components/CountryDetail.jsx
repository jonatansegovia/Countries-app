import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getCountryByParams } from '../actions';

export default function CountryDetail() {
  const { idPais } = useParams();
  //   const country = useSelector((state) => state.country);
  const dispatch = useDispatch();
  dispatch(getCountryByParams(idPais));
  //   console.log(idPais);
  //   console.log(country);
  return <div>{'hola'}</div>;
}
