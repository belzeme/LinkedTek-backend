const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.createComment = ({ email, id, content }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (post: Post), (user: User{email:"${email}"})
      WHERE id(post) = ${id}
      CREATE (comment:Comment {content:"${content}", creation_time:"${new Date().toISOString()}"})
      CREATE (post)<-[:COMMENT_OF]-(comment)-[:COMMENT_FROM]->(user)
      RETURN comment
    `)
      .then(res => session.close(() => resolve(res.records)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.listUserComment = ({ email }) => {
  const session = driver.session(neo4j.session.READ);
  
  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (user:User {email: "${email}"})<-[:COMMENT_FROM]-(comment)-[:COMMENT_OF]->(post: Post)-[:POST_FROM]->(owner)
      RETURN user, comment, post, owner
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.updateComment = ({ id, properties }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    const querySet = properties.map((property) => `SET comment.${property.label}="${property.value}"`);

    session.run(`
      MATCH (comment: Comment)
      WHERE id(comment) = ${id}
      ${querySet.join('\n')}
      RETURN comment
    `)
      .then(res => session.close(() => resolve(res.records)))
      .catch(error => reject(error));
  });
};

exports.deleteComment = ({ id }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (comment: Comment)
      WHERE id(comment) = ${id}
      DETACH DELETE comment
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};