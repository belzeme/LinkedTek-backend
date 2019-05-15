const { check, validationResult } = require('express-validator/check');
const { Company } = require('../models');

exports.validate = (method) => {
  switch(method) {
  case 'createCompany': {
    return [
      check('name').exists(),
      check('description').exists(),
      check('country').exists()
    ];
  }
  }
};

exports.createCompany = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Company.createCompany(req.body)
    .then((companyData) => res.send(companyData))
    .catch((error) => res.status(403).send({ detail: `${error}`, fields: [{ field: req.body, status: 'already used' }] }));
};

exports.listCompany = (req, res) => {
  Company.listCompany()
    .then((companyList) => res.send(companyList))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};