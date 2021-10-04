import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCountryByParams } from '../../actions';
import CardById from '../Card/CardById';

import Card from '../Card/Card';

export default function CountryDetail() {
  const { idPais } = useParams();
  const dispatch = useDispatch();
  const countryFound = useSelector((state) => state.country);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCountryByParams(idPais));
    setLoading(false);
    /* eslint-disable */
  }, [setLoading]);

  console.log('COUNTRY DETAIL: ', countryFound);
  return (
    <div>
      <Link to="/countries">HOME</Link>
      <CardById
        countries={[countryFound]}
        loading={loading}
        byParams={idPais}
      />
    </div>
  );
}
