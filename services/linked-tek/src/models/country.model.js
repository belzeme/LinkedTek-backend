const { countryApi } = require('../apis');

exports.listCountry = () => {
  return new Promise((resolve, reject) => {
    countryApi.listCountry()
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};