const api = require('../apis/neo4j.api');

exports.createSchool = (schoolData) => {
  return new Promise((resolve, reject) => {
    api.createSchool(schoolData)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.listSchool = () => {
  return new Promise((resolve, reject) => {
    api.listSchool()
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};