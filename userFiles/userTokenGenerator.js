const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    email: user.email,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, 'hellothere!', options);
}

module.exports = {
  generateToken,
};
