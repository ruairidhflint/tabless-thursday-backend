const express = require('express');
const db = require('./tabHelpers');
const Middleware = require('./tabMiddleware');
const Auth = require('../authFiles/restrictedMiddleware');
const Errors = require('../errorHandling/errors');

const Router = express.Router();

Router.get('/all', (req, res) => {
  db.getAllTabs()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

Router.get('/tab', Auth.restrictedRoute, (req, res) => {
  const { id } = req.decodedToken;
  db.getUsersTabs(id)
    .then((data) => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ message: Errors.noSavedTabs });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

Router.post('/tab', Auth.restrictedRoute, Middleware.checkPostIsValid, (req, res) => {
  const { id } = req.decodedToken;
  const { url, title, notes } = req.body;
  const newTab = {
    url, title, notes, user_id: id,
  };
  db.postNewTabByUserID(newTab)
    .then(() => {
      res.status(200).json({ message: Errors.postSuccess, data: newTab });
    })
    .catch(() => {
      res.status(500).json({ message: Errors.postFailed });
    });
});

Router.delete('/tab/:id', Auth.restrictedRoute, Middleware.checkTabIDIsValid, (req, res) => {
  const { id } = req.params;
  const requiredUserID = req.userID;
  const userID = req.decodedToken.id;
  if (requiredUserID === userID) {
    db.deleteTabByTabID(id)
      .then(() => {
        res.status(200).json({ message: Errors.successfulDeletion });
      })
      .catch((err) => {
        res.status(500).json({ err, message: Errors.error });
      });
  } else {
    res.status(403).json({ message: Errors.invalidPermissions });
  }
});

Router.put('/tab/:id', Auth.restrictedRoute, Middleware.checkTabIDIsValid, Middleware.checkPostIsValid, (req, res) => {
  const { id } = req.params;
  const userID = req.decodedToken.id;
  const updatedTab = {
    url: req.body.url,
    title: req.body.title,
    notes: req.body.notes,
    user_id: userID,
  };
  if (req.userID === Number(userID)) {
    db.updateTabByID(updatedTab, id)
      .then(() => {
        res.status(202).json(updatedTab);
      })
      .catch(() => {
        res.status(500).json({ message: Errors.error });
      });
  } else {
    res.status(403).json({ message: Errors.invalidPermissions });
  }
});

module.exports = Router;
