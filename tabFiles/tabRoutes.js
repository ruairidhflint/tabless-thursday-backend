const express = require('express');
const db = require('./tabHelpers');
const Middleware = require('./tabMiddleware');
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

Router.post('/tabs', Auth.restrictedRoute, Middleware.checkPostIsValid, (req, res) => {
  const { id } = req.decodedToken;
  const { url, title, notes } = req.body;
  const newTab = {
    url, title, notes, user_id: id,
  };

  db.postNewTabByUserID(newTab)
    .then(() => {
      res.status(200).json({ message: 'Post success', data: newTab });
    })
    .catch(() => {
      res.status(500).json({ message: 'Post failed.' });
    });
});

module.exports = Router;
