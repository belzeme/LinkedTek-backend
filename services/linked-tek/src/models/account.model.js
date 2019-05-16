const { accountApi } = require('../apis');

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
const subscriptionTargetValid = (target) => target && (target === 'Company' || target === 'School');

exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    accountApi.createUser(userData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.subscribeUser = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionData.target = capitalize(subscriptionData.target);
    if (!subscriptionTargetValid(subscriptionData.target)) {
      reject(`${subscriptionData.target} is not a valid value for target.`);
    } else {
      accountApi.subscribeUser(subscriptionData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }
  });
};

exports.listUserSubscription = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionData.target = capitalize(subscriptionData.target);
    if (!subscriptionTargetValid(subscriptionData.target)) {
      reject(`${subscriptionData.target} is not a valid value for target.`);
    } else {
      accountApi.listUserSubscription(subscriptionData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }
  });
};

exports.deleteUserSubscription = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionData.target = capitalize(subscriptionData.target);
    if (!subscriptionTargetValid(subscriptionData.target)) {
      reject(`${subscriptionData.target} is not a valid value for target.`);
    } else {
      accountApi.deleteUserSubscription(subscriptionData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }
  });
};

exports.addLeader = (relationData) => {
  return new Promise((resolve, reject) => {
    accountApi.addLeader(relationData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.listLeader = (userData) => {
  return new Promise((resolve, reject) => {
    accountApi.listLeader(userData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.deleteLeader = (relationData) => {
  return new Promise((resolve, reject) => {
    accountApi.deleteLeader(relationData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};