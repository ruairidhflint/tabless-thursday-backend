const db = require('./userHelpers');

async function checkIfUserExists(req, res, next) {
  const { email } = req.body;
  const user = await db.getUserByEmail(email);
  if (user.length) {
    res.status(409).json({ message: 'This email has already been used!' });
  } else {
    next();
  }
}

function checkAllFieldsArePresent(req, res, next) {
  const { email, password, name } = req.body;
  if (email && password && name) {
    next();
  } else {
    res.status(400).json({ message: 'Please ensure all fields are present.' });
  }
}

module.exports = {
  checkIfUserExists,
  checkAllFieldsArePresent,
};
