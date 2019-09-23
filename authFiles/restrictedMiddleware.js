const jwt = require('jsonwebtoken');

function restrictedRoute(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: 'can\'t touch this' });
      } else {
        req.decodedToken = decodedToken;
        res.status(200).json(req.decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'SHALL NOT PASS!' });
  }
}

module.exports = {
  restrictedRoute,
};
