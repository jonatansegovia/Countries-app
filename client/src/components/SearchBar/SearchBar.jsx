import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getSearch } from '../../actions';

import s from './SearchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  function handleOnChange(name) {
    setText(name);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getSearch(text));
    setText('');
  }
  return (
    <form className={s.main} onSubmit={(e) => handleOnSubmit(e)}>
      <div className={s.left}>
        <i className="fas fa-globe-americas fa-2x"></i>
        <label htmlFor="title">Countries App</label>
      </div>
      <div className={s.center}>
        <div className={s['center-input-btn']}>
          <input
            className={s.input}
            onChange={(e) => handleOnChange(e.target.value)}
            type="text"
            id="title"
            placeholder="Search a country by name..."
            value={text}
          />
          <button className={s.btn} type="submit" path="/activity">
            Search
          </button>
        </div>
      </div>
      <div className={s.right}>
        <Link to="/activity">Create Activiy</Link>
      </div>
    </form>
  );
}
