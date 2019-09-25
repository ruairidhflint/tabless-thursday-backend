const express = require('express');
const bcrypt = require('bcrypt');

const db = require('./userHelpers');
const middleware = require('./userMiddleware');
const authMiddleware = require('../authFiles/restrictedMiddleware');
const jwt = require('../authFiles/tokenGenerator');

const Router = express.Router();

Router.get('/', (req, res) => {
  db.getAllUsers()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Some kind of error', err });
    });
});

Router.post('/signup', middleware.checkAllFieldsArePresent,
  middleware.checkEmailIsValid,
  middleware.checkIfUserExists,
  middleware.checkPasswordIsValid, (req, res) => {
    const newUserDetails = req.body;
    const { email, password, name } = newUserDetails;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = {
      email,
      name,
      password: hashedPassword,
    };

    db.addNewUser(newUser)
      .then((data) => {
        res.status(202).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

Router.post('/login', middleware.checkLoginFieldsArePresent, middleware.checkEmailIsValid, (req, res) => {
  const { email, password } = req.body;
  db.getUserByEmail(email)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.generateToken(user);
        res.status(200).json({ token, name: user.name, id: user.id });
      } else {
        res.status(401).json({ message: 'Invalid login credentials.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

Router.delete('/:id', authMiddleware.restrictedRoute, (req, res) => {
  const { id } = req.params;
  if (Number(id) === req.decodedToken.id) {
    db.deleteUser(id)
      .then(() => {
        res.status(200).json({ message: 'User account deleted.' });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } else {
    res.status(400).json({ message: 'You do not have permissions to perform this action' });
  }
});

module.exports = Router;
