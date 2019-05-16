const { Router } = require('express');
const { create, errorHandler } = require('../adapters/api.adapter');
const { adaptSchoolList } = require('../adapters/data.adapter');

const ACCOUNT_SERVICE_NAME = process.env.ACCOUNT_SERVICE_NAME || 'localhost';
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || '3000';
const BASE_URL = `http://${ACCOUNT_SERVICE_NAME}:${ACCOUNT_SERVICE_PORT}/api/account/`;

const api = create(BASE_URL);
const router = Router();

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return this message', path: '.' },

      { method: 'POST', description: 'Create an account', path: '/create' },

      { method: 'POST', description: 'Create an subscription', path: '/subscription' },
      { method: 'REPORT', description: 'List an user subscription', path: '/subscription' },
      { method: 'DELETE', description: 'Delete an user subscription', path: '/subscription' },

      { method: 'POST', description: 'Create an leader', path: '/leader' },
      { method: 'REPORT', description: 'List an user leaders', path: '/leader' },
      { method: 'DELETE', description: 'Delete an user leader', path: '/leader' },
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

router.post('/subscription', (req, res) => {
  api.post(req.path, req.body)
    .then(resp => res.send(resp.data))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

router.report('/subscription', (req, res) => {
  api.post(`${req.path}/list`, req.body)
    .then(resp => res.send(adaptSchoolList(resp.data)))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

router.delete('/subscription', (req, res) => {
  api.delete(req.path, { data: req.body })
    .then(resp => res.send(resp.data))
    .catch((error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    }));
});

router.post('/leader', (req, res) => {
  api.post(req.path, req.body)
    .then(resp => res.send(resp.data))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

router.report('/leader', (req, res) => {
  api.post(`${req.path}/list`, req.body)
    .then(resp => res.send(adaptSchoolList(resp.data)))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});

router.delete('/leader', (req, res) => {
  api.delete(req.path, { data: req.body })
    .then(resp => res.send(resp.data))
    .catch(error => {
      const adaptedError = errorHandler(error);
      res.status(adaptedError.status).send(adaptedError.message);
    });
});


module.exports = router;