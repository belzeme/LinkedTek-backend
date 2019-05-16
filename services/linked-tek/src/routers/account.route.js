const express = require('express');
const router = express.Router();
const { accountController } = require('../controller');

router.get('/', (req, res) => {
  res.send(
    {
      methods: [
        { method: 'GET', description: 'Return this message', path: '.' },
        { method: 'POST', description: 'Create an user', path: '/create' },
        { method: 'POST', description: 'Subscribe an user to a company or school', path: '/subscription' },
        { method: 'DELETE', description: 'Delete an user subsciption to a company or school', path: '/subscription' },
        { method: 'POST', description: 'List the subsciptions of an user to companies or schools', path: '/list' },
      ]
    }
  );
});

router.post('/create', accountController.validate('createUser'), accountController.createUser);

router.post('/subscription/list', accountController.validate('checkUser'), accountController.listUserSubscription);
router.post('/subscription', accountController.validate('subscribeUser'), accountController.subscribeUser);
router.delete('/subscription', accountController.validate('subscribeUser'), accountController.deleteUserSubscription);

router.post('/leader/list', accountController.validate('checkUser'), accountController.listLeader);
router.post('/leader', accountController.validate('relationData'), accountController.addLeader);
router.delete('/leader', accountController.validate('relationData'), accountController.deleteLeader);

module.exports = router;