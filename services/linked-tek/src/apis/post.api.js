const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.createPost = ({ email, title, content }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (u:User {email: "${email}"})
      CREATE (p:Post {title: "${title}", content: "${content}", creation_time: timestamp()})
      CREATE (p)-[:POST_FROM]->(u)
    `)
      .then(res => {
        session.close(() => resolve(res.record));
      })
      .catch(error => session.close(() => reject(error)));
  });
};