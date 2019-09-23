const express = require('express');
const db = require('./userHelpers');

const Router = express.Router();

Router.get('/', (req, res) => {
  res.status(200).json('Everything is working! version 2.0');
});


module.exports = Router;
