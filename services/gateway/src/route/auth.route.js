const { Router } = require('express');
const { create, errorHandler } = require('../adapters/api.adapter');

const BASE_URL = process.env.AUTH_SERVICE_ROUTE || 'http://localhost:3030/api/auth/';
const api = create(BASE_URL);
const router = Router();

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return this message', path: '.' }
    ]
  });
});

router.get('/ping', (req, res) => {
  api.get('/')
    .then(resp => {
      res.send(resp.data);
    })
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

router.post('/register', (req, res) => {
  api.post(req.path, req.body)
    .then(resp => res.send(resp.data))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

router.post('/login', (req, res) => {
  api.post(req.path, req.body)
    .then(resp => res.send(resp.data))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});
module.exports = router;