const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, process.env.JWTSECRET, options);
}

module.exports = {
  generateToken,
};
