const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.createSchool = ({ name, description, country }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (country: Country)
      WHERE country.name = "${country}"
      CREATE (school: School {name: "${name}", description: "${description}"})
      CREATE (school)-[r:SCHOOL_FROM]->(country)
    `)
      .then((res) => {
        session.close(() => {resolve(res.records);});
      })
      .catch((error) => reject(error));
  });
};

exports.listSchool = () => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run('MATCh (s: School) RETURN s')
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => reject(error));
  });
};

exports.filterSchool = ({ name }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
    MATCH (country: Country{name: "${name}"})<-[:SCHOOL_FROM]-(school: School)
    RETURN school
    `)
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => reject(error));
  });
};