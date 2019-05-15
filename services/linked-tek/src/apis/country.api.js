const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.listCountry = () => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run('MATCH (c: Country) RETURN c')
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => reject(error));
  });
};
