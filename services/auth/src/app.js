const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.route');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3030;
const dbName = process.env.dbName || 'test';
const dbService = process.env.dbService || 'mongodb';
const dbAddress = process.env.dbAddress || 'localhost';

mongoose.connect(`${dbService}://${dbAddress}:27017/${dbName}`, { useNewUrlParser: true });


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/auth', userRouter);

app.listen(port);