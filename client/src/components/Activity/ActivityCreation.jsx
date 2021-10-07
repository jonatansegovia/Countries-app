import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { filterByAlphabet, getCountries, postActivity } from '../../actions';

import { validate } from '../Utils';
import ActivityForm from '../ActivityForm/ActivityForm';
import PopUp from '../PopUp/PopUp';

import s from './ActivityCreation.module.css';

export default function ActivityCreation() {
  const dispatch = useDispatch();
  const [buttonPopUp, setButtonPopUp] = useState(false);

  //--SELECT COUNTRIES ORDERED
  const countriesFounded = useSelector((state) => state.countries);

  if (countriesFounded.length > 0) {
    dispatch(filterByAlphabet('ascending'));
  }
  //--

  useEffect(() => {
    dispatch(getCountries());
    /* eslint-disable */
  }, []);

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

  //--

  //RESTART BUTTON
  const restart = () => {
    dispatch(filterByAlphabet('ascending'));
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
      <ActivityForm
        handleOnSubmit={handleOnSubmit}
        handleInputChange={handleInputChange}
        inputsForm={inputsForm}
        error={error}
        countriesFounded={countriesFounded}
        restart={restart}
        setButtonPopUp={setButtonPopUp}
      />

      <PopUp trigger={buttonPopUp}>
        <h3>Activity Created Successfully!</h3>
      </PopUp>
      <div className={s['container-link']}>
        <div className={s.left}>
          <i className="fas fa-globe-americas fa-2x"></i>
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
