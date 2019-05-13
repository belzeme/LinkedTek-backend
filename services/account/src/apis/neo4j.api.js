const neo4j = require('neo4j-driver').v1;
const neo4jURL = process.env.RELATION_DB_URL || 'bolt://localhost:7687';
const neo4jCredential = {
  user: process.env.RELATION_DB_USER || 'neo4j',
  password: process.env.RELATION_DB_PASS || 'admin'
};
const driver = new neo4j.driver(neo4jURL, neo4j.auth.basic(neo4jCredential.user, neo4jCredential.password));

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

exports.createSchool = ({ name }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run('CREATE (school: School {name: $name})', { name })
      .then((res) => {
        session.close(() => {resolve(res.records);});
      })
      .catch((error) => reject(error));
  });
};

exports.listCountry = () => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run('MATCH (c: Country) RETURN c')
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => reject(error));
  });
};