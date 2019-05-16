const { Router } = require('express');
const { create, errorHandler } = require('../adapters/api.adapter');
const { adaptSchoolList } = require('../adapters/data.adapter');

const ACCOUNT_SERVICE_NAME = process.env.ACCOUNT_SERVICE_NAME || 'localhost';
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || '3000';
const BASE_URL = `http://${ACCOUNT_SERVICE_NAME}:${ACCOUNT_SERVICE_PORT}/api/user/`;

const api = create(BASE_URL);
const router = Router();

router.post('/', (req, res) => {
  api.get(req.path)
    .then(resp => res.send(resp.data))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

router.post('/list', (req, res) => {
  api.post(req.path, req.body)
    .then(resp => res.send(adaptSchoolList(resp.data)))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

module.exports = router;