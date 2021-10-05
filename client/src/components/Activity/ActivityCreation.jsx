import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCountries, filterByAlphabet, postActivity } from '../../actions';

import PopUp from '../PopUp/PopUp';

import s from './ActivityCreation.module.css';

function validate(input) {
  let error = {};

  var regName = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
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
  const [buttonPopUp, setButtonPopUp] = useState(false);

  //--SELECT COUNTRIES ORDERED
  const [forAlphabet, setForAlphabet] = useState(false);
  const countriesFounded = useSelector((state) => state.countries);

  if (countriesFounded.length > 0 && forAlphabet === false) {
    dispatch(filterByAlphabet('ascending'));
    setForAlphabet(true);
  }
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

  const handleInputChange = (inputs) => {
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
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(postActivity(inputsForm));
      setinputsForm({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        inputCountries: [],
      });
      setButtonPopUp(true);
      setTimeout(() => {}, 1000);
    } else {
      alert(
        'You are trying to create an activity without filling all the fields! '
      );
      setButtonPopUp(false);
    }
  }

  useEffect(() => {
    dispatch(getCountries());
    setError(validate(inputsForm));
    /* eslint-disable */
  }, []);
  //--

  //RESTART BUTTON
  const restart = () => {
    dispatch(filterByAlphabet('ascending'));
    setForAlphabet(true);
    setinputsForm({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      inputCountries: [],
    });
  };
  //-

  return (
    <div className={s.container}>
      <form
        className={s['container__form']}
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <h2>Create Here :</h2>
        <label htmlFor="forName">Name: </label>
        <input
          type="text"
          name="name"
          id="forName"
          onChange={handleInputChange}
          value={inputsForm.username}
        />
        {error.name && <span>{error.name}</span>}

        <label htmlFor="forDifficulty">Difficulty: </label>
        <input
          type="number"
          name="difficulty"
          id="forDifficulty"
          min="1"
          max="5"
          onChange={handleInputChange}
          value={inputsForm.difficulty}
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
          className={s['select-countries']}
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
        {error.inputCountries && <span>{error.inputCountries}</span>}

        <button
          className={s['create-btn']}
          type="submit"
          onClick={handleOnSubmit}
        >
          CREATE
        </button>

        <button
          className={s['create-btn-restart']}
          type="reset"
          onClick={restart}
        >
          RESTART
        </button>

        <PopUp trigger={buttonPopUp}>
          <h3>Activity Created Successfully!</h3>
        </PopUp>
      </form>
      <div className={s['container-link']}>
        <div className={s.left}>
          <i class="fas fa-globe-americas fa-2x"></i>
          <label htmlFor="title">Countries App</label>
        </div>
        <Link className={s.link} to="/countries">
          Home
        </Link>
      </div>

      <div className={s['container__section']}>
        <section className={s.section}>
          <div>Name: {inputsForm.name}</div>
          <div>Difficulty: {inputsForm.difficulty}</div>
          <div>Duration: {inputsForm.duration}</div>
          <div>Season: {inputsForm.season}</div>
          <div className={s['container__section-countries']}>
            Countries:
            <p>{inputsForm.inputCountries.join(' - ')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
