const { Country, Activities } = require('../db.js');
const { getFromApi, getFromDb } = require('../utils');

const { Op } = require('sequelize');

const getAllCountries = async (req, res, next) => {
  const { name } = req.query;

  try {
    const countriesResult = [];

    const countriesDb = await getFromDb();
    const countriesApi = await getFromApi();

    if (countriesDb.length === 0) {
      const db = await Country.bulkCreate(countriesApi);

      countriesApi.forEach((c) => countriesResult.push(c.name));
    } else if (countriesDb.length > 0) {
      countriesDb.forEach((c) => countriesResult.push(c.name));
    }

    if (!name) {
      return res.send(countriesResult);
    } else {
      const nameQueryToUp = name.charAt(0).toUpperCase() + name.slice(1);

      const nameMatch = await Country.findAll({
        where: {
          name: {
            [Op.like]: `%${nameQueryToUp}%`,
          },
        },
      });

      nameMatch.length === 0
        ? res.json({ message: 'Country not found!' })
        : res.send(nameMatch);
    }
  } catch (e) {
    res.send(e);
  }
};

const getCountryByParams = async (req, res, next) => {
  const countryIdToUp = req.params.idPais.toUpperCase();

  try {
    var countryFound = await Country.findOne({
      where: {
        id: countryIdToUp,
      },
      include: { model: Activities, through: { attributes: [] } },
    });

    Object.values(countryFound) && res.send(countryFound);
  } catch (e) {
    res.send(e);
  }
};

const postActivity = async (req, res, next) => {
  const { name, difficulty, duration, season } = req.body;

  const activityCreated = await Activities.create({
    name,
    difficulty,
    duration,
    season,
  });

  res.send(activityCreated);
};

module.exports = {
  getAllCountries,
  getCountryByParams,
  postActivity,
};
