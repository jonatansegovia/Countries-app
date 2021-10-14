const { Country, Activities } = require('../db.js');

const postActivity = async (req, res) => {
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
    return res.status(400).send({ message: 'Creation Failed' });
  }
};

const getActivity = async (req, res) => {
  try {
    const activities = await Activities.findAll();
    return res.status(200).send(activities);
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  getActivity,
  postActivity,
};
