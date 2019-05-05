const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authRouter = require('./route/auth.route');

const app = express();
const port = process.env.PORT || 3010;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/auth', authRouter );
app.listen(port);
