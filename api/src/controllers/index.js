const { Country, Activities } = require('../db.js');
const { getFromDb } = require('../utils');

const { Op } = require('sequelize');

const getAllCountries = async (req, res, next) => {
  const { name } = req.query;

  try {
    const countriesDb = await getFromDb();

    if (!name) {
      return res.send(countriesDb);
    } else {
      const nameMatch = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Activities,
          attributes: ['name', 'difficulty', 'duration', 'season'],
          through: { attributes: [] },
        },
      });
      nameMatch.length === 0 ? res.json() : res.send(nameMatch);
    }
  } catch (e) {
    return res.send(e);
  }
};

const getCountryByParams = async (req, res, next) => {
  const countryIdToUp = req.params.idPais.toUpperCase();

  try {
    const countryFound = await Country.findOne({
      where: {
        id: countryIdToUp,
      },
      include: {
        model: Activities,
        attributes: ['name', 'difficulty', 'duration', 'season'],
        through: { attributes: [] },
      },
    });

    Object.values(countryFound) && res.send(countryFound);
  } catch (e) {
    res.send(e);
  }
};

const postActivity = async (req, res, next) => {
  try {
    const { name, difficulty, duration, season, inputCountries } = req.body;

    const activityCreated = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });

    const dbCountries = await Country.findAll({
      where: {
        name: inputCountries,
      },
    });

    const result = await activityCreated.addCountry(dbCountries);

    return res.status(200).send({ result, message: 'Activity Created' });
  } catch (e) {
    // console.error(e);
    return res.status(400).send({ message: 'Creation Failed' });
  }
};

const getActivity = async (req, res, next) => {
  try {
    const activities = await Activities.findAll();
    res.status(200).send(activities);
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  getActivity,
  getAllCountries,
  getCountryByParams,
  postActivity,
};
