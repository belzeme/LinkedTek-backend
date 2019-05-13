const Country = require('../models/country.model');

exports.listCountry = (req, res) => {
  Country.listCountry()
    .then((countryList) => res.send(countryList))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};