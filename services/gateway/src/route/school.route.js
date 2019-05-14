const { Router } = require('express');
const { create, errorHandler } = require('../adapters/api.adapter');
const { adaptSchoolList } = require('../adapters/data.adapter');

const ACCOUNT_SERVICE_NAME = process.env.ACCOUNT_SERVICE_NAME || 'localhost';
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || '3000';
const BASE_URL = `http://${ACCOUNT_SERVICE_NAME}:${ACCOUNT_SERVICE_PORT}/api/school/`;

const api = create(BASE_URL);
const router = Router();

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return this message', path: '.' }
    ]
  });
});

router.post('/create', (req, res) => {
  api.post(req.path, req.body)
    .then(resp => res.send(resp.data))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

router.get('/list', (req, res) => {
  api.get(req.path, req.body)
    .then(resp => res.send(adaptSchoolList(resp.data)))
    .catch(error => {
      const adapterError = errorHandler(error);
      res.status(adapterError.status).send(adapterError.message);
    });
});

module.exports = router;