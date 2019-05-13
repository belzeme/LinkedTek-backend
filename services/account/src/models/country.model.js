const api = require('../apis/neo4j.api');

exports.listCountry = () => {
  return new Promise((resolve, reject) => {
    api.listCountry()
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};