import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getSearch } from '../../actions';

import './searchBar.css';

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
    <form className="searchBar_container" onSubmit={(e) => handleOnSubmit(e)}>
      <label htmlFor="title">Search a Country</label>
      <input
        onChange={(e) => handleOnChange(e.target.value)}
        type="text"
        id="title"
        placeholder="type here..."
        value={text}
      />
      <button type="submit" path="/activity">
        Search
      </button>
      <Link to="/activity">Create Activiy</Link>
    </form>
  );
}
