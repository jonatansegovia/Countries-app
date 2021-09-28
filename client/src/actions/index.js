import axios from 'axios';

export function getCountries() {
  return async function (dispatch) {
    var json = await axios('http://localhost:3001/countries');
    // console.log(json.data);
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
