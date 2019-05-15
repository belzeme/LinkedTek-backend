const { driver } = require('./neo4j.api');

module.exports = {
  driver,
  userApi: require('./user.api'),
  schoolApi: require('./school.api'),
  countryApi: require('./country.api'),
  companyApi: require('./company.api')
};