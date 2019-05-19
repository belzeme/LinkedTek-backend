const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.createPost = ({ email, title, content }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (u:User {email: "${email}"})
      CREATE (p:Post {title: "${title}", content: "${content}", creation_time: "${new Date().toISOString()}"})
      CREATE (p)-[:POST_FROM]->(u)
    `)
      .then(res => {
        session.close(() => resolve(res.record));
      })
      .catch(error => session.close(() => reject(error)));
  });
};

exports.listPost = ({ email }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (u:User {email: "${email}"})<-[:POST_FROM]-(p:Post)
      return p
    `)
      .then(res => session.close(() => resolve(res.records)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.updatePost = ({ id, properties }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    const querySet = properties.map((property) => `SET post.${property.label}="${property.value}"`);
    
    session.run(`
      MATCH (post: Post) WHERE id(post) = ${id}
      ${querySet.join('\n')}
      RETURN post
      `)
      .then(res => session.close(() => resolve(res.records)))
      .catch(error => reject(error));
  });
};

exports.deletePost = ({ id }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {

    session.run(`
    MATCH (post: Post) WHERE id(post) = ${id}
    DETACH DELETE post
    `)
      .then(res => session.close(() => resolve(res.records)))
      .catch(error => reject(error));
  });
};

exports.listComment = ({ id }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (post:Post)<-[:COMMENT_OF]-(comment)-[:COMMENT_FROM]->(user)
      WHERE id(post) = ${id}
      RETURN post, comment, user
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};