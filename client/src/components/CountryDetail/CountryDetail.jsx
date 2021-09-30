import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCountryByParams } from '../../actions';
import Card from '../Card/Card';

export default function CountryDetail() {
  const { idPais } = useParams();
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.country);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCountryByParams(idPais));
    setLoading(false);
  }, [setLoading]);

  return (
    <div>
      <Card countries={[allCountries]} loading={loading} byParams={idPais} />
    </div>
  );
}
