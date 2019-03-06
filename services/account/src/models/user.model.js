const api = require('../apis/neo4j.api');

exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    api.createUser(userData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};
