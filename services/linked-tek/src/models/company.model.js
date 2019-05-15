const { companyApi } = require('../apis');

exports.createCompany = (companyData) => {
  return new Promise((resolve, reject) => {
    companyApi.createCompany(companyData)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.listCompany = () => {
  return new Promise((resolve, reject) => {
    companyApi.listCompany()
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.filterCompany = (filterData) => {
  return new Promise((resolve, reject) => {
    companyApi.filterCompany(filterData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};