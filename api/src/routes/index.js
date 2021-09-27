const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const {
  getAllCountries,
  getCountryByParams,
  postActivity,
} = require('../controllers');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', getAllCountries);

router.get('/countries/:idPais', getCountryByParams);

router.post('/activity', postActivity);

module.exports = router;
