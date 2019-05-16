const router = require('express').Router();
const { userController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return this message', path: '.' },
      { method: 'POST', description: 'List the user with the given name', path: '/list' },
    ]
  });
});

router.post('/list', userController.validate('listUser'), userController.listUser);

module.exports = router;