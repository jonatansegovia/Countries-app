const { Country, Activities } = require('../db.js');
const { getFromDb } = require('../utils');

const { Op } = require('sequelize');

const getAllCountries = async (req, res, next) => {
  const { name } = req.query;

  try {
    const countriesDb = await getFromDb();

    if (!name) {
      return res.status(200).send(countriesDb);
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
      nameMatch.length === 0
        ? res.status(200).json()
        : res.status(200).send(nameMatch);
    }
  } catch (e) {
    return res.status(400).json({ message: e });
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

    Object.values(countryFound) && res.status(200).send(countryFound);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

module.exports = {
  getAllCountries,
  getCountryByParams,
};
