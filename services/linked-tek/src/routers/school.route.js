const router = require('express').Router();
const { schoolController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return the school list', path: '.' },
      { method: 'POST', descriptoin: 'Creates an school', path: '/create' }
    ],
    links: []
  });
});

router.post('/create', schoolController.validate('createSchool'), schoolController.createSchool);
router.get('/list', schoolController.listSchool);

module.exports = router;