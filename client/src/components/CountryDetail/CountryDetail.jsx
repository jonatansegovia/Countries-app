import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCountryByParams } from '../../actions';
import CardsById from '../CardsById/CardsById';

import s from './CountryDetail.module.css';

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
    <div className={s['container-CountryDetail']}>
      <div className={s['container-CountryDetail__link']}>
        <Link to="/countries">HOME</Link>
      </div>
      <div className={s['container-CountryDetail__flag']}>
        <CardsById
          countries={[countryFound]}
          loading={loading}
          byParams={idPais}
        />
      </div>
      <div className={s['container-CountryDetail__center']}>CENTER</div>
      <div className={s['container-CountryDetail__right']}>DERECHA</div>
    </div>
  );
}
