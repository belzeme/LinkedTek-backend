const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const userRouter = require('./route/user.route');

const app = express();


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(expressValidator());

app.use('/api/auth', userRouter);

app.listen(port);