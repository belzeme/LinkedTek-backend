const { userApi } = require('../apis');

exports.listUser = (queryData) => {
  return new Promise((resolve, reject) => {
    userApi.listUser(queryData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};