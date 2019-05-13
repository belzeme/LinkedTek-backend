const { check, validationResult } = require('express-validator/check');
const School = require('../models/school.model');

exports.validate = (method) => {
  switch(method) {
  case 'createSchool': {
    return [
      check('name').exists(),
    ];
  }
  }
};

exports.createSchool = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name } = req.body;
  School.createSchool({ name })
    .then((schoolData) => res.send(schoolData))
    .catch((error) => res.status(403).send({ detail: `${error}`, fields: [{ field: name, status: 'already used' }] }));
};