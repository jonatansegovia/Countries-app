import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCountryByParams } from '../../actions';
import CardById from '../CardById/CardById';

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

  return (
    <div>
      <div>
        <Link to="/countries">HOME</Link>
      </div>
      <div>
        <CardById
          countries={[countryFound]}
          loading={loading}
          byParams={idPais}
        />
      </div>
      <div></div>
    </div>
  );
}
