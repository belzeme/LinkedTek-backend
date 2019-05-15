const { userApi } = require('../apis');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    userApi.createUser(userData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.subscribeUser = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionData.target = capitalize(subscriptionData.target);
    if (!subscriptionData.target || (subscriptionData.target !== 'Company' && subscriptionData.target !== 'School')) {
      reject(`${subscriptionData.target} is not a valid value for target.`);
    } else {
      userApi.subscribeUser(subscriptionData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }
  });
};

exports.listUserSubscription = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionData.target = capitalize(subscriptionData.target);
    if (!subscriptionData.target || (subscriptionData.target !== 'Company' && subscriptionData.target !== 'School')) {
      reject(`${subscriptionData.target} is not a valid value for target.`);
    } else {
      userApi.listUserSubscription(subscriptionData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }
  });
};

