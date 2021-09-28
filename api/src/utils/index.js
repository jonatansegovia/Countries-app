const axios = require('axios');
const { Country } = require('../db.js');

const getFromApi = async () => {
  const { data } = await axios.get('https://restcountries.com/v3/all');
  const dataFromApi = data.map((d) => {
    return {
      name: d.name.common,
      id: d.cca3,
      flag: d.flags[1],
      continent: d.region,
      capital: d.capital && d.capital[0],
      subregion: d.subregion,
      area: d.area,
      population: d.population,
    };
  });

  return dataFromApi;
};

const getFromDb = async () => {
  const countriesinDb = await Country.findAll();

  return countriesinDb;
};

module.exports = {
  getFromApi,
  getFromDb,
};
