const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
app.use('/user', userRoutes);; // express to forward user routes to routes/users.js

module.exports = app; 