const express = require('express');
const db = require('./tabHelpers');
// const middleware = require('./tabMiddleware');

const Router = express.Router();

Router.get('/', (req, res) => {
  db.getAllTabs()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

module.exports = Router;
