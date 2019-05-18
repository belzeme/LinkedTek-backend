const router = require('express').Router();
const { postController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'return this message', path: '.' },
      { method: 'POST', description: 'create a post', path: '/' },
      { method: 'POST', description: 'List the user posts', path: '/list' }
    ]
  });
});

router.post('/', postController.validate('createPost'), postController.createPost);
router.post('/list', postController.validate('listPost'), postController.listPost);
module.exports = router;