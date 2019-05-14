const { create } = require('../adapters/api.adapter');

const ACCOUNT_SERVICE_NAME = process.env.ACCOUNT_SERVICE_NAME || 'localhost';
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT || '3000';
const BASE_URL = `http://${ACCOUNT_SERVICE_NAME}:${ACCOUNT_SERVICE_PORT}/api/school/`;

const api = create(BASE_URL);

const createSchool = (name, description, country) => {
  return api.post('/create', { name, description, country });
};

const listSchool = () => {
  return api.get('/list');
};

module.exports = {
  createSchool,
  listSchool
};
