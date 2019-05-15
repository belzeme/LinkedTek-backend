const { schoolApi } = require('../apis');

exports.createSchool = (schoolData) => {
  return new Promise((resolve, reject) => {
    schoolApi.createSchool(schoolData)
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
    schoolApi.listSchool()
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.filterSchool = (filterData) => {
  return new Promise((resolve, reject) => {
    schoolApi.filterSchool(filterData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};