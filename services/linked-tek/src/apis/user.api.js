const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.listUser = ({ name }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    const queryParam = name ? `{name: "${name}"}` : '';

    session.run(`
      MATCH (u: User ${queryParam}) RETURN u
    `)
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => session.close(() => reject(error)));
  });
};