const { Router } = require('express');
const { create, errorHandler } = require('../adapters/api.adapter');
// const { adaptNodeId } = require('../adapters/data.adapter');

const ACCOUNT_SERVICE_NAME = process.env.ACCOUNT_SERVICE_NAME || 'localhost';
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || '3020';
const BASE_URL = `http://${ACCOUNT_SERVICE_NAME}:${ACCOUNT_SERVICE_PORT}/api/post/`;

const api = create(BASE_URL);
const router = Router();

router.get('/', (req, res) => {
  api.get(req.path)
    .then(resp => res.send(resp.data))
    .catch(() => res.status(500).send(`${BASE_URL} is not reachable`));
});

router.post('/', (req, res) => {
  api.post(req.path, req.body)
    .then(resp => res.send(resp.data))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(`${adaptedError.message}`);
    });
});

module.exports = router;