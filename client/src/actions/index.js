import axios from 'axios';

export function getCountries() {
  return async function (dispatch) {
    var json = await axios('http://localhost:3001/countries');
    console.log(json.data);
    return dispatch({
      type: 'GET_COUNTRIES',
      payload: json.data,
    });
  };
}

export function getCountryByParams(id) {
  return async function (dispatch) {
    var json = await axios(`http://localhost:3001/countries/${id}`);
    // console.log(json.data);
    return dispatch({
      type: 'GET_COUNTRIES_BY_ID',
      payload: json.data,
    });
  };
}

export function getSearch(text) {
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/countries?name=${text}`);
    console.log(text);
    // console.log(json.data);
    return dispatch({
      type: 'GET_SEARCH_ONE',
      payload: json.data,
    });
  };
}

export function filterCountryByContinent(payload) {
  console.log(payload);
  return {
    type: 'FILTER_CONTINENT',
    payload,
  };
}

export function filterByAlphabet(payload) {
  return {
    type: 'FILTER_BY_ALPHABET',
    payload,
  };
}

export function filterByArea(payload) {
  return {
    type: 'FILTER_BY_AREA',
    payload,
  };
}
