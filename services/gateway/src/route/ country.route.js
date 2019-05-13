const { Router } = require('express');
const { create, errorHandler } = require('../adapters/api.adapter');
const { adaptCountryList } = require('../adapters/country.adapter');

const ACCOUNT_SERVICE_NAME = process.env.ACCOUNT_SERVICE_NAME || 'localhost';
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || '3000';
const BASE_URL = `http://${ACCOUNT_SERVICE_NAME}:${ACCOUNT_SERVICE_PORT}/api/country/`;

const api = create(BASE_URL);
const router = Router();

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return this message', path: '.' }
    ]
  });
});

router.get('/list', (req, res) => {
  api.get(req.path)
    .then(resp => res.send(adaptCountryList(resp.data)))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

module.exports = router;