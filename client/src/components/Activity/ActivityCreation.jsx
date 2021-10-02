import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCountries, filterByAlphabet, postActivity } from '../../actions';

function validate(input) {
  let error = {};

  var regName = /^[a-zA-Z]+$/;
  var regNumberBetween = /^[1-5]+$/;
  const regInteger = /^\d+$/;

  if (!regName.test(input.name)) {
    error.name = 'Name is required';
  } else if (!regNumberBetween.test(input.difficulty)) {
    error.difficulty = 'Difficulty is required';
  } else if (!input.duration) {
    error.duration = 'Duration is required';
  } else if (!regInteger.test(input.duration)) {
    error.duration = 'Duration must be a number';
  } else if (!input.season) {
    error.season = 'Season is required';
  } else if (input.inputCountries.length === 0) {
    error.inputCountries = 'At least one country is required';
  }
  return error;
}

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

  //--HANDLING INPUTS & ERRORS
  const [inputsForm, setinputsForm] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    inputCountries: [],
  });

  const [error, setError] = useState({});

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

    setError(
      validate({
        ...inputsForm,
        [inputs.target.name]: inputs.target.value,
      })
    );
  }

  const [text, setText] = useState('');

  function handleOnSubmit(e) {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(postActivity(inputsForm));
      setText('');
      setinputsForm({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        inputCountries: [],
      });
    } else {
      alert(
        'You are trying to create an activity with empty spaces in your form'
      );
    }
  }
  console.log(Object.keys(error).length === 0);

  //--

  //RESTART BUTTON
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
        {error.name && <span>{error.name}</span>}
        {error.inputCountries && <span>{error.inputCountries}</span>}

        <label htmlFor="forDifficulty">Difficulty: </label>
        <input
          type="number"
          name="difficulty"
          id="forDifficulty"
          min="1"
          max="5"
          onChange={handleInputChange}
          value={inputsForm.difficulty || 0}
        />
        {error.difficulty && <span>{error.difficulty}</span>}

        <label htmlFor="forDuration">Duration (min): </label>
        <input
          type="text"
          name="duration"
          id="forDuration"
          onChange={handleInputChange}
          value={inputsForm.duration}
        />
        {error.duration && <span>{error.duration}</span>}

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
        {error.season && <span>{error.season}</span>}

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
        {error.inputCountries && <span>{error.inputCountries}</span>}

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
