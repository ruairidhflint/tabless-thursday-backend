const express = require('express');
const db = require('./tabHelpers');
const Auth = require('../authFiles/restrictedMiddleware');

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

Router.get('/tabs', Auth.restrictedRoute, (req, res) => {
  const { id } = req.decodedToken;
  db.getUsersTabs(id)
    .then((data) => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ message: 'No saved tabs yet!' });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

module.exports = Router;