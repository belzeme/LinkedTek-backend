const router = require('express').Router();
const { postController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'return this message', path: '.' },
      { method: 'POST', description: 'create a Post', path: '/' }
    ]
  });
});

router.post('/', postController.validate('createPost'), postController.createPost);

module.exports = router;