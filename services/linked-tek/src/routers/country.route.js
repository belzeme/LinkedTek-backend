const router = require('express').Router();
const { countryController } = require('../controller');

router.get('/', (req, res) => {
  res.send({
    methods: [
      { method: 'GET', description: 'Return this message', path: '.' },
      { method: 'GET', description: 'List the country', path: '/list' }
    ]
  });
});

router.get('/list', countryController.listCountry);

module.exports = router;