const axios = require('axios');
const { Country } = require('../db.js');

const getFromApi = async () => {
  try {
    const { data } = await axios.get('https://restcountries.com/v3/all');

    const dataFromApi = await data.map(async (d) => {
      const country = {
        name: d.name.common,
        id: d.cca3,
        flag: d.flags[0],
        continent: d.region,
        capital: d.capital && d.capital[0],
        subregion: d.subregion,
        area: d.area,
      };

      Country.findOrCreate({
        where: { id: d.cca3 },
        defaults: country,
      });

      return country;
    });

    return dataFromApi;
  } catch (e) {
    (e) => console.log(e);
  }
};

const getFromDb = async () => {
  const countriesinDb = await Country.findAll();
  return countriesinDb;
};

module.exports = {
  getFromApi,
  getFromDb,
};
