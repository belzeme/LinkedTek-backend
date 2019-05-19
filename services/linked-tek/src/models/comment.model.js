const { commentApi } = require('../apis');

exports.createComment = (commentData) => {
  return new Promise((resolve, reject) => {
    commentApi.createComment(commentData)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

