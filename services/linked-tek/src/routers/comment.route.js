const router = require('express').Router();
const { commentController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'return this message', path: '.' },
      { method: 'POST', description: 'Create a comment', path: '/' },
      { method: 'DELETE', description: 'Delete a comment', path: '' },
      { method: 'PATCH', description: 'update a comment', path: '' },
    ]
  });
});

router.post('/', commentController.validate('createComment'), commentController.createComment);
router.post('/user', commentController.validate('listUserComment'), commentController.listUserComment);
router.delete('/', commentController.validate('deleteComment'), commentController.deleteComment);
router.patch('/', commentController.validate('updateComment'), commentController.updateComment);
module.exports = router;