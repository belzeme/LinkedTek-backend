const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const { userRouter, schoolRouter, countryRouter } = require('./routers');

const app = express();


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('dev'));

app.use('/api/account', userRouter);
app.use('/api/school', schoolRouter);
app.use('/api/country', countryRouter);

app.listen(port);