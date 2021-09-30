import axios from 'axios';

export const getCountries = () => {
  return async function (dispatch) {
    try {
      var json = await axios('http://localhost:3001/countries');
      return dispatch({
        type: 'GET_COUNTRIES',
        payload: json.data,
      });
    } catch (e) {
      console.error('ERROR', e);
    }
  };
};

export const getCountryByParams = (id) => {
  return async function (dispatch) {
    try {
      var json = await axios(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: 'GET_COUNTRIES_BY_ID',
        payload: json.data,
      });
    } catch (e) {
      console.error('ERROR', e);
    }
  };
};

export const getSearch = (text) => {
  return async function (dispatch) {
    try {
      let json = await axios(`http://localhost:3001/countries?name=${text}`);
      return dispatch({
        type: 'GET_SEARCH_ONE',
        payload: json.data,
      });
    } catch (e) {
      console.error('ERROR', e);
    }
  };
};

export const getActivities = () => {
  return async function (dispatch) {
    try {
      const json = await axios('http://localhost:3001/activity');
      return dispatch({
        type: 'GET_ACTIVITIES',
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const filterCountryByContinent = (payload) => {
  return {
    type: 'FILTER_CONTINENT',
    payload,
  };
};

export const filterByAlphabet = (payload) => {
  return {
    type: 'FILTER_BY_ALPHABET',
    payload,
  };
};

export const filterByArea = (payload) => {
  return {
    type: 'FILTER_BY_AREA',
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: 'FILTER_CREATED',
    payload,
  };
};

export const postActivity = (body) => {
  return async function (dispatch) {
    try {
      const json = await axios.post('http://localhost:3001/activity', body);
      console.log('BODY: ', body);
      return json;
    } catch (err) {
      console.error('ERROR', err);
    }
  };
};
