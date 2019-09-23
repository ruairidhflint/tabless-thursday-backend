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

module.exports = {
  checkIfUserExists,
};
