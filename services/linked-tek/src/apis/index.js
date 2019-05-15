const { driver } = require('./neo4j.api');
const userApi = require('./user.api');
const schoolApi = require('./school.api');
const countryApi = require('./country.api');

module.exports = {
  driver,
  userApi,
  schoolApi,
  countryApi
};