const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authRouter = require('./route/auth.route');
const accountRouter = require('./route/account.route');
const schoolRouter = require('./route/school.route');
const countryRouter = require('./route/ country.route');

const app = express();
const port = process.env.PORT || 3010;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/auth', authRouter );
app.use('/account', accountRouter);
app.use('/school', schoolRouter);
app.use('/country', countryRouter);
app.listen(port);
