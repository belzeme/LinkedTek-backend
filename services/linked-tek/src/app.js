const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const { accountUser, schoolRouter, countryRouter, companyRouter } = require('./routers');

const app = express();


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('dev'));

app.use('/api/account', accountUser);
app.use('/api/school', schoolRouter);
app.use('/api/country', countryRouter);
app.use('/api/company', companyRouter);
app.listen(port);