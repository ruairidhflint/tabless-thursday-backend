const express = require('express');
const db = require('./userHelpers');

const Router = express.Router();

Router.get('/', (req, res) => {
  db.getAllUserEmails()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

Router.post('/signup', (req, res) => {
  const newUserDetails = req.body;
  db.addNewUser(newUserDetails)
    .then((data) => {
      res.status(202).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = Router;
