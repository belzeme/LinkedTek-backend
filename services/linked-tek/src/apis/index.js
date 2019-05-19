const { driver } = require('./neo4j.api');

module.exports = {
  driver,
  accountApi: require('./account.api'),
  schoolApi: require('./school.api'),
  countryApi: require('./country.api'),
  companyApi: require('./company.api'),
  userApi: require('./user.api'),
  postApi: require('./post.api'),
  commentApi: require('./comment.api'),
};