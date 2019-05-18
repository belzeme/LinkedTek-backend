const { postApi } = require('../apis');

exports.createPost = (postData) => {
  return new Promise((resolve, reject) => {
    postApi.createPost(postData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};