const neo4j = require('neo4j-driver').v1;

const neo4jURL = process.env.RELATION_DB_URL || 'bolt://localhost:7687';
const neo4jCredential = {
  user: process.env.RELATION_DB_USER || 'neo4j',
  password: process.env.RELATION_DB_PASS || 'admin'
};
const driver = new neo4j.driver(neo4jURL, neo4j.auth.basic(neo4jCredential.user, neo4jCredential.password));

exports.driver = driver;

