const { commentApi } = require('../apis');

exports.createComment = (commentData) => {
  return new Promise((resolve, reject) => {
    commentApi.createComment(commentData)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

exports.listUserComment = (userData) => {
  return new Promise((resolve, reject) => {
    commentApi.listUserComment(userData)
      .then(res => {
        const ret = res.records.map((record) => {
          return {
            post: Object.assign({ id: record.get('post').identity.low }, record.get('post').properties),
            user: Object.assign({ id: record.get('user').identity.low }, record.get('user').properties),
            comment: Object.assign({ id: record.get('comment').identity.low }, record.get('comment').properties),
            owner: Object.assign({ id: record.get('owner').identity.low }, record.get('owner').properties)
          };
        });
        resolve(ret);
      })
      .catch(error => reject(error));
  });
};