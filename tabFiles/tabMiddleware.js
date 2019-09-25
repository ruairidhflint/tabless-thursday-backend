const db = require('./tabHelpers');
const Errors = require('../errorHandling/errors');


function checkPostIsValid(req, res, next) {
  const { url, title } = req.body;
  if (url && title) {
    next();
  } else {
    res.status(500).json({ message: Errors.allFieldsPresent });
  }
}

async function checkTabIDIsValid(req, res, next) {
  const { id } = req.params;
  const validTab = await db.getTabByID(id);
  if (validTab) {
    req.userID = validTab.user_id;
    next();
  } else {
    res.status(400).json({ message: Errors.invalidTabID });
  }
}

module.exports = {
  checkPostIsValid,
  checkTabIDIsValid,
};
