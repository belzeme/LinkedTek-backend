const { userApi } = require('../apis');

exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    userApi.createUser(userData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};
