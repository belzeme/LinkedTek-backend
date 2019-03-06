const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.get('/', (req, res) => {
  res.send(
    {
      methods: [
        { method: 'GET', description: 'Return this message', path: '.' },
        { method: 'POST', description: 'Register an user', path: '/register' },
        { method: 'POST', description: 'Log in an user', path: '/login' },
        { method: 'DELETE', description: 'Delete an user authentication info', path: '/delete' }
      ]
    }
  );
});

router.post('/register', userController.register);
router.post('/login', userController.signIn);
router.delete('/delete', userController.delete);

module.exports = router;