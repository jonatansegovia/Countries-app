import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCountries, filterByAlphabet } from '../../actions';

export default function ActivityCreation() {
  const dispatch = useDispatch();
  const countriesFounded = useSelector((state) => state.countries);
  countriesFounded.length > 0 && dispatch(filterByAlphabet('ascending'));

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [text, setText] = useState('');

  function handleOnChange(name) {
    setText(name);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    // dispatch(getCountryByParams(text));
    setText('');
  }

  console.log(countriesFounded, '1234234');
  return (
    <div>
      <Link to="/countries">Home</Link>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <h2>Create a new activity</h2>

        <label htmlFor="forName">Name: </label>
        <input type="text" name="name" id="name" />

        <label htmlFor="forDifficulty">Difficulty: </label>
        <input type="number" name="dificulty" id="dificulty" min="0" max="5" />

        <label htmlFor="forDuration">Duration (min): </label>
        <input type="text" name="duration" id="duration" min="0" max="5" />

        <label htmlFor="forActivities">Season: </label>
        <select id="forActivities" onChange={(e) => handleOnChange(e)}>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="autumn">Autumn</option>
        </select>

        <label htmlFor="forCountries">Países: </label>
        <select name="forCountries" id="forCountries">
          {countriesFounded.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
