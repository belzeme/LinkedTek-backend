const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.createCompany = ({ name, description, country }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (country: Country)
      WHERE country.name = "${country}"
      CREATE (company: Company {name: "${name}", description: "${description}"})
      CREATE (company)-[r:COMPANY_FROM]->(country)
    `)
      .then((res) => {
        session.close(() => {resolve(res.records);});
      })
      .catch((error) => reject(error));
  });
};

exports.listCompany = () => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run('MATCh (c: Company) RETURN c')
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => reject(error));
  });
};

exports.filterCompany = ({ name }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
    MATCH (country: Country{name: "${name}"})<-[:COMPANY_FROM]-(company:Company)
    RETURN company
    `)
      .then(res => session.close(() => resolve(res.records)))
      .catch(error => reject(error));
  });
};

exports.updateCompany = ({ name, properties }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    const querySet = properties.map((property) => `SET company.${property.label}="${property.value}"`);

    session.run(`
    MATCH (company: Company {name:"${name}"})
    ${querySet.join('\n')}
    RETURN company
    `)
      .then(res => session.close(() => resolve(res.records)))
      .catch(error => reject(error));
  });
};