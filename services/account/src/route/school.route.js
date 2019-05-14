const router = require('express').Router();
const routeController = require('../controller/school.controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return the school list', path: '.' },
      { method: 'POST', descriptoin: 'Creates an school', path: '/create' }
    ],
    links: []
  });
});

router.post('/create', routeController.validate('createSchool'), routeController.createSchool);
router.get('/list', routeController.listSchool);

module.exports = router;