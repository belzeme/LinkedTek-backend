const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.createComment = ({ email, id, content }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (post: Post) WHERE id(post) = ${id}
      CREATE (comment:Comment {content:"${content}", creation_time:"${new Date().toISOString()}"})
      CREATE (post)<-[:COMMENT_OF]-(comment)-[:COMMENT_FROM]->(: User{email:"${email}"})
      RETURN comment
    `)
      .then(res => session.close(() => resolve(res.records)))
      .catch(error => session.close(() => reject(error)));
  });
};