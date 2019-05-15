const router = require('express').Router();
const { companyController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return this message', path: '.' },
      { method: 'GET', description: 'List the companies', path: '/list' },
      { method: 'POST', description: 'Creates a company', path: '/list' },
    ]
  });
});

router.get('/list', companyController.listCompany);
router.post('/create', companyController.validate('createCompany'), companyController.createCompany);

module.exports = router;