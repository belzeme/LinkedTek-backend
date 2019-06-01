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

router.post('/suggestion', accountController.validate('checkUser'), accountController.listSuggestion);
router.post('/feed', accountController.validate('checkUser'), accountController.getActualityFeed);

router.post('/message', accountController.validate('sendMessage'), accountController.sendMessage);
router.post('/inbox', accountController.validate('checkUser'), accountController.inbox);
router.post('/outbox', accountController.validate('checkUser'), accountController.outbox);

router.post('/profile', accountController.validate('checkUser'), accountController.getProfile);
router.patch('/profile', accountController.validate('updateProfileData'), accountController.patchProfile);
router.patch('/profile/country', accountController.validate('updateProfileCountry'), accountController.patchProfileCountry);
router.patch('/profile/job', accountController.validate('updateProfileCompany'), accountController.patchProfileCurrentJob);

module.exports = router;