const db = require('./userHelpers');
const Errors = require('../errorHandling/errors');

async function checkIfUserExists(req, res, next) {
  const { email } = req.body;
  const user = await db.getUserByEmail(email);
  if (user) {
    res.status(409).json({ message: Errors.emailUsed });
  } else {
    next();
  }
}

function checkAllFieldsArePresent(req, res, next) {
  const { email, password, name } = req.body;
  if (email && password && name) {
    next();
  } else {
    res.status(400).json({ message: Errors.allFieldsPresent });
  }
}

function checkLoginFieldsArePresent(req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else {
    res.status(400).json({ message: Errors.allFieldsPresent });
  }
}

function checkEmailIsValid(req, res, next) {
  const { email } = req.body;
  if (email.includes('@') && email.includes('.')) {
    next();
  } else {
    res.status(400).json({ message: Errors.invalidEmaiLFormat });
  }
}

function checkPasswordIsValid(req, res, next) {
  const { password } = req.body;
  if (password.length > 7) {
    next();
  } else {
    res.status(400).json({ message: Errors.passwordFormat });
  }
}

module.exports = {
  checkIfUserExists,
  checkAllFieldsArePresent,
  checkLoginFieldsArePresent,
  checkEmailIsValid,
  checkPasswordIsValid,
};
