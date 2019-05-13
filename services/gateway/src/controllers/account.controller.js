const { create } = require('../adapters/api.adapter');

const ACCOUNT_SERVICE_NAME = process.env.ACCOUNT_SERVICE_NAME || 'localhost';
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || '3000';
const BASE_URL = `http://${ACCOUNT_SERVICE_NAME}:${ACCOUNT_SERVICE_PORT}/api/account/`;

const api = create(BASE_URL);

const createUser = (email, password) => {
  return api.post('/create', { email, password });
};

module.exports = {
  createUser
};