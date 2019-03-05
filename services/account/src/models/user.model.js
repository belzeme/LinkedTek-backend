exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    console.log('create user', userData);
    resolve(userData);
  });
}

console.log(exports);
