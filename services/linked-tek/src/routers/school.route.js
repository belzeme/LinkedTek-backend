const router = require('express').Router();
const { schoolController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return the school list', path: '.' },
      { method: 'POST', description: 'Creates an school', path: '/create' },
      { method: 'GET', description: 'List schools', path: '/list' },
      { method: 'PATCH', description: 'Update school', path: '/' },
    ]
  });
});

router.post('/create', schoolController.validate('createSchool'), schoolController.createSchool);
router.post('/filter', schoolController.validate('filterSchool'), schoolController.filterSchool);
router.get('/list', schoolController.listSchool);
router.patch('/', schoolController.validate('updateSchool'), schoolController.updateSchool);
module.exports = router;