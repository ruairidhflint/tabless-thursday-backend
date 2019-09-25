const jwt = require('jsonwebtoken');
const Errors = require('../errorHandling/errors');

function restrictedRoute(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: Errors.invalidPermissions });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: Errors.invalidLoginDetails });
  }
}

module.exports = {
  restrictedRoute,
};
