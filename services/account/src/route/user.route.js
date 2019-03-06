const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/', (req, res) => {
  res.send(
    {
      methods: [
        { method: 'GET', description: 'Return this message', path: '.' },
        { method: 'POST', description: 'Create an user', path: '/login' },
      ],
      links: []
    }
  );
});

router.post('/login', userController.validate('createUser'), userController.createUser);
module.exports = router;