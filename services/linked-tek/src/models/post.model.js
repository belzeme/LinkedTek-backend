const { postApi } = require('../apis');

exports.createPost = (postData) => {
  return new Promise((resolve, reject) => {
    postApi.createPost(postData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.listPost = (queryData) => {
  return new Promise((resolve, reject) => {
    postApi.listPost(queryData)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

exports.updatePost = (postData) => {
  return new Promise((resolve, reject) => {
    postApi.updatePost(postData)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

exports.deletePost = (postData) => {
  return new Promise((resolve, reject) => {
    postApi.deletePost(postData)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};