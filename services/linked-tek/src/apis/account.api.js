const neo4j = require('neo4j-driver').v1;
const { driver } = require('./neo4j.api');

exports.createUser = ({ email, name }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run('CREATE (user: User {email: $email, name: $name})', { email, name })
      .then((res) => {
        session.close(() => {
          resolve(res.records);
        });
      })
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.subscribeUser = ({ email, target, name }) => {
  const session = driver.session(neo4j.session.WRITE);
  
  return new Promise((resolve, reject) => {
    session.run(`
    MATCH (user:User {email: "${email}"}), (target:${target} {name: "${name}"})
    CREATE (user)-[:SUBSCRIBED_TO]->(target)
    `)
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.listUserSubscription = ({ email, target }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
    MATCH (user: User {email: "${email}"})-[:SUBSCRIBED_TO]->(target: ${target})
    RETURN target
    `)
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.deleteUserSubscription = ({ email, target, name }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
    MATCH (:User {email: "${email}"})-[r:SUBSCRIBED_TO]->(:${target} {name:"${name}"})
    DELETE r
    `)
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.addLeader = ({ follower, leader }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (follower: User{email: "${follower}"}), (leader: User{email:"${leader}"})
      CREATE (follower)-[:FOLLOWS]->(leader)
    `)
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.listLeader = ({ email }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (:User{email: "${email}"})-[:FOLLOWS]->(leader:User)
      RETURN leader
    `)
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.deleteLeader = ({ follower, leader }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (User{email: "${follower}"})-[r:FOLLOWS]->(:User{email: "${leader}"})
      DELETE r
    `)
      .then((res) => session.close(() => resolve(res.records)))
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.listSuggestion = ({ email }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (user: User {email:"${email}"})-[:FOLLOWS*2..3]->(leader)-[:SUBSCRIBED_TO*0..3]->(entity)
      RETURN leader, entity
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.getActualityFeed = ({ email }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (:User {email: "${email}"})-[:FOLLOWS]-(leader)<-[:POST_FROM|:COMMENT_FROM]-(item)
      RETURN item, leader
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.sendMessage = ({ sender, title, content, receiver }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (sender:User {email: "${sender}"}), (receiver:User {email: "${receiver}"})
      CREATE (message:Message {title: "${title}", content: "${content}", creation_time: "${new Date().toISOString()}"})
      CREATE (sender)<-[:MESSAGE_FROM]-(message)-[:MESSAGE_TO]->(receiver)
      return message
      `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};