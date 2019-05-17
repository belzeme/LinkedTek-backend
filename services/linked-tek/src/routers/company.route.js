const router = require('express').Router();
const { companyController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return this message', path: '.' },
      { method: 'GET', description: 'List the companies', path: '/list' },
      { method: 'POST', description: 'Creates a company', path: '/list' },
      { method: 'UPDATE', description: 'Update a company', path: '.' },
    ]
  });
});

router.get('/list', companyController.listCompany);
router.post('/create', companyController.validate('createCompany'), companyController.createCompany);
router.post('/filter', companyController.validate('filterCompany'), companyController.filterCompany);
router.patch('/', companyController.validate('updateCompany'), companyController.updateCompany);

module.exports = router;