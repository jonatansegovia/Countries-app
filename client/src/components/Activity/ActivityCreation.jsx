import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCountries, filterByAlphabet, postActivity } from '../../actions';

export default function ActivityCreation() {
  const dispatch = useDispatch();

  //--Select Countries Ordered
  const [forAlphabet, setForAlphabet] = useState(false);
  const countriesFounded = useSelector((state) => state.countries);

  if (countriesFounded.length > 0 && forAlphabet === false) {
    dispatch(filterByAlphabet('ascending'));
    setForAlphabet(true);
  }

  useEffect(() => {
    dispatch(getCountries());
  }, []);
  //--

  //--Handling Inputs
  const [inputsForm, setinputsForm] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    inputCountries: [],
  });

  function handleInputChange(inputs) {
    if (inputs.target.name === 'inputCountries') {
      setinputsForm({
        ...inputsForm,
        [inputs.target.name]: [
          ...inputsForm.inputCountries,
          inputs.target.value,
        ],
      });
    } else {
      setinputsForm({
        ...inputsForm,
        [inputs.target.name]: inputs.target.value,
      });
    }
  }

  const [text, setText] = useState('');

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(inputsForm));
    setText('');
    setinputsForm({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      inputCountries: [],
    });
  }

  const result = useSelector((state) => state.activities);
  console.log(result);
  //--

  const restart = () => {
    setinputsForm({
      ...inputsForm,
      inputCountries: [],
    });
  };
  return (
    <div>
      <Link to="/countries">Home</Link>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <h2>Create a new activity</h2>
        <label htmlFor="forName">Name: </label>
        <input
          type="text"
          name="name"
          id="forName"
          onChange={handleInputChange}
          value={inputsForm.username}
        />
        <label htmlFor="forDifficulty">Difficulty: </label>
        <input
          type="number"
          name="difficulty"
          id="forDifficulty"
          min="0"
          max="5"
          onChange={handleInputChange}
          value={inputsForm.difficulty || 0}
        />
        <label htmlFor="forDuration">Duration (min): </label>
        <input
          type="text"
          name="duration"
          id="forDuration"
          onChange={handleInputChange}
          value={inputsForm.duration}
        />
        <label htmlFor="forActivities">Season: </label>
        <select
          onChange={(e) => handleInputChange(e)}
          name="season"
          id="forActivities"
        >
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="autumn">Autumn</option>
        </select>
        <label htmlFor="forCountries">Países: </label>

        <select
          name="inputCountries"
          id="forCountries"
          onChange={(e) => handleInputChange(e)}
        >
          {countriesFounded.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <p>{inputsForm.inputCountries}</p>

        <button type="reset" onClick={restart}>
          RESTART
        </button>

        <button type="submit" onClick={handleOnSubmit}>
          CREATE
        </button>
      </form>
    </div>
  );
}
