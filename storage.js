require('dotenv').config();
require('./mongo-connect')();
const express = require('express');
const app = express();
const path = require('path');

/**
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', require('./route/API'));

app.listen(3000, () => { console.log('Listening on port 3000') });