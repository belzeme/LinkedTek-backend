const express = require('express');
const router = express.Router();
const { userController } = require('../controller');

router.get('/', (req, res) => {
  res.send(
    {
      methods: [
        { method: 'GET', description: 'Return this message', path: '.' },
        { method: 'POST', description: 'Create an user', path: '/create' },
        { method: 'POST', description: 'Subscribe an user to a company or school', path: '/subscription' },
        { method: 'POST', description: 'List the subsciptions of an user to companies or schools', path: '/subscription/list' },
      ]
    }
  );
});

router.post('/create', userController.validate('createUser'), userController.createUser);
router.post('/subscription/list', userController.validate('createUser'), userController.listUserSubscription);
router.post('/subscription', userController.validate('subscribeUser'), userController.subscribeUser);

module.exports = router;