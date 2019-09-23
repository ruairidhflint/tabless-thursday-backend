const express = require('express');
const db = require('./userHelpers');
const middleware = require('./userMiddleware');
const jwt = require('../authFiles/tokenGenerator');

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

Router.post('/signup', middleware.checkAllFieldsArePresent,
  middleware.checkIfUserExists,
  middleware.checkEmailIsValid,
  middleware.checkPasswordIsValid, (req, res) => {
    const newUserDetails = req.body;
    db.addNewUser(newUserDetails)
      .then((data) => {
        res.status(202).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

Router.post('/login', middleware.checkEmailIsValid, (req, res) => {
  const { email, password } = req.body;
  db.getUserByEmail(email)
    .then((user) => {
      if (user.password === password) {
        const token = jwt.generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid login credentials.' });
      }
    });
});

module.exports = Router;
