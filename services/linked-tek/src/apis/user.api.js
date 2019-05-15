const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.createUser = ({ email }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run('CREATE (user: User {email: $email})', { email })
      .then((res) => {
        session.close(() => {
          resolve(res.records);
        });
      })
      .catch((error) => reject(error));
  });
};
