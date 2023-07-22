require('dotenv').config();
require('./mongo-connect')();
const express = require('express');
const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./route/API'));

app.listen(3000, () => { console.log('Listening on port 3000') });