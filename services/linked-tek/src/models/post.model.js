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

exports.listComment = (postData) => {
  return new Promise((resolve, reject) => {
    postApi.listComment(postData)
      .then(res => {
        const ret = res.records.map((record) => {
          return {
            post: { id: record.get('post').identity.low },
            comment: Object.assign({ id: record.get('comment').identity.low }, record.get('comment').properties),
            user: Object.assign({ id: record.get('user').identity.low }, record.get('user').properties),
          };
        });
        resolve(ret);
      })
      .catch(error => reject(error));
  });
};