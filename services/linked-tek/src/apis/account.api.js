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

exports.inbox = ({ email }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (:User {email: "${email}"})<-[:MESSAGE_TO]-(message)-[:MESSAGE_FROM]->(sender)
      RETURN message, sender
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.outbox = ({ email }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (:User {email: "${email}"})<-[:MESSAGE_FROM]-(message)-[:MESSAGE_TO]->(receiver)
      RETURN message, receiver
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

const deleteProfileCurrentJob = (email) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (:User {email: "${email}"})-[r:WORK_AT]->()
      DELETE r
    `)
      .then(() => session.close(() => resolve()))
      .catch((error) => session.close(() => reject(error)));
  });
};

const setProfileCurrentJob = (email, company, title) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (user:User {email: "${email}"}), (company:Company {name: "${company}"})
      CREATE (user)-[:WORK_AT {from: "${new Date().toISOString()}", title: "${title}"}]->(company)
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};
exports.patchProfileCurrentJob = ({ email, company, title }) => {
  return deleteProfileCurrentJob(email)
    .then(() => setProfileCurrentJob(email, company, title));
};

const deleteProfileCountry = (email) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH(:User {email: "${email}"})-[r:USER_FROM]->()
      DELETE r
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

const addProfileCountry = (email, country) => {
  const session = driver.session(neo4j.session.WRITE);
  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (user: User {email: "${email}"}), (country: Country {name: "${country}"})
      CREATE (user)-[:USER_FROM]->(country)
    `)
      .then(() => session.close(() => resolve()))
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.patchProfileCountry = ({ email, country }) => {
  return deleteProfileCountry(email)
    .then(() => addProfileCountry(email, country));
};

exports.getProfile = ({ email }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (user: User{email: "${email}"})
      OPTIONAL MATCH (user)-[:USER_FROM]->(country)
      OPTIONAL MATCH (user)-[job:WORK_AT]-(company)
      RETURN user, country, company, job
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

const mapPatchProperty = (property) => {
  if (typeof property.value === 'number') {
    return `SET user.${property.label} = ${property.value}`; 
  } else {
    return `SET user.${property.label} = "${property.value}"`;
  }
};

const filterPatchProperties = (properties) => properties.filter(property => property.label !== 'country' && property.label !== 'company');

exports.patchProfile = ({ email, properties }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    const querySet = filterPatchProperties(properties)
      .map(property => mapPatchProperty(property));
    
    session.run(`
        MATCH (user:User {email: "${email}"})
        ${querySet.join('\n')}
    `)
      .then((res) => resolve(res))
      .catch((error) => session.close(() => reject(error)));
  });
};

exports.addJob = ({ email, company, job }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (user:User {email: "${email}"}), (company:Company {name: "${company}"})
      CREATE (user)-[:WORKED_AT {from: "${new Date(job.from).toISOString()}", to: "${new Date(job.to).toISOString()}", title: "${job.title}"}]->(company)
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.getJobHistory = ({ email }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (:User {email:"${email}"})-[job:WORKED_AT]->(company)
      RETURN job, company
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.addStudy = ({ email, school, study }) => {
  const session = driver.session(neo4j.session.WRITE);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (user:User {email: "${email}"}), (school:School {name: "${school}"})
      CREATE (user)-[:STUDIED_AT {from: "${new Date(study.from).toISOString()}", to: "${new Date(study.to).toISOString()}", title: "${study.title}"}]->(school)
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};

exports.getStudyHistory = ({ email }) => {
  const session = driver.session(neo4j.session.READ);

  return new Promise((resolve, reject) => {
    session.run(`
      MATCH (:User {email:"${email}"})-[study:STUDIED_AT]->(school)
      RETURN study, school
    `)
      .then(res => session.close(() => resolve(res)))
      .catch(error => session.close(() => reject(error)));
  });
};