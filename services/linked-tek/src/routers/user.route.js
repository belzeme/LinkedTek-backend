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
        { method: 'DELETE', description: 'Delete an user subsciption to a company or school', path: '/subscription' },
        { method: 'REPORT', description: 'List the subsciptions of an user to companies or schools', path: '/subscription' },
      ]
    }
  );
});

router.post('/create', userController.validate('createUser'), userController.createUser);

router.post('/subscription/list', userController.validate('checkUser'), userController.listUserSubscription);
router.post('/subscription', userController.validate('subscribeUser'), userController.subscribeUser);
router.delete('/subscription', userController.validate('subscribeUser'), userController.deleteUserSubscription);

router.post('/leader/list', userController.validate('checkUser'), userController.listLeader);
router.post('/leader', userController.validate('relationData'), userController.addLeader);
router.delete('/leader', userController.validate('relationData'), userController.deleteLeader);

module.exports = router;