const neo4j = require('neo4j-driver').v1;
const neo4jURL = process.env.RELATION_DB_URL || 'bolt://localhost:7687';
const neo4jCredential = {
  user: process.env.RELATION_DB_USER || 'neo4j',
  password: process.env.RELATION_DB_PASS || 'admin'
};

const driver = new neo4j.driver(neo4jURL, neo4j.auth.basic(neo4jCredential.user, neo4jCredential.password));
const session = driver.session(neo4j.session.WRITE);

const clearConstants = () => {
  return session.run('MATCH (c: Country) DELETE c');
};

const initConstraints = () => {
  console.log('Constraints creation');
  return session.run('CREATE CONSTRAINT ON (country:Country) assert country.name IS UNIQUE');
};

const initCountry = () => {
  const countryList = require('./resources/country.json');
  // Map the countries and then use string.join to create the query
  const queryItems = countryList.map(country => `(:Country {name: "${country.name}"})`);
  
  const query = `CREATE ${queryItems.join(',')}`; 
  
  return session.run(query);
};

const closeSession = () => {
  session.close();
};

clearConstants()
  .then(() => initConstraints())
  .then(() => initCountry())
  .then((res) => {
    session.close();
    console.log(res);
    process.exit();
  })
  .then(() => {
    closeSession();
    process.exit();
  })
  .catch((error) => console.log(error));

// process.exit();
