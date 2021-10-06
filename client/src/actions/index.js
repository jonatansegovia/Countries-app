import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_BY_ID = 'GET_COUNTRIES_BY_ID';
export const GET_SEARCH_ONE = 'GET_SEARCH_ONE';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const FILTER_BY_ALPHABET = 'FILTER_BY_ALPHABET';
export const FILTER_BY_AREA = 'FILTER_BY_AREA';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';

export const getCountries = () => {
  return async function (dispatch) {
    try {
      var json = await axios('http://localhost:3001/countries');
      return dispatch({
        type: GET_COUNTRIES,
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
        type: GET_COUNTRIES_BY_ID,
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
        type: GET_SEARCH_ONE,
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
        type: GET_ACTIVITIES,
        payload: json.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const filterCountryByContinent = (payload) => {
  return {
    type: FILTER_CONTINENT,
    payload,
  };
};

export const filterByAlphabet = (payload) => {
  return {
    type: FILTER_BY_ALPHABET,
    payload,
  };
};

export const filterByArea = (payload) => {
  return {
    type: FILTER_BY_AREA,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export function filterByActivity(act) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: act,
  };
}

export const postActivity = (body) => {
  return async function (dispatch) {
    try {
      const json = await axios.post('http://localhost:3001/activity', body);
      return json;
    } catch (err) {
      console.error('ERROR', err);
    }
  };
};
