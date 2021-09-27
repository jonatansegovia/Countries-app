const axios = require('axios');
const { Country } = require('../db.js');

const getFromApi = async () => {
  const { data } = await axios.get('https://restcountries.com/v2/all');
  const dataFromApi = data.map((d) => {
    return {
      name: d.name,
      id: d.alpha3Code,
      flag: d.flags[1],
      continent: d.continent,
      capital: d.capital,
      subregion: d.region,
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
