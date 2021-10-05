import React from 'react';
import { Link } from 'react-router-dom';

import s from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={s.container}>
      <h1 className={s['container__title']}>Welcome to Countries App</h1>
      <Link to="/countries">
        <button className={s['container__button']}>Go!</button>
      </Link>
      <p className={s['container__p']}>By J0n</p>
    </div>
  );
}
