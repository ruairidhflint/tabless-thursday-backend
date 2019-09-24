const db = require('./tabHelpers');

function checkPostIsValid(req, res, next) {
  const { url, title } = req.body;
  if (url && title) {
    next();
  } else {
    res.status(500).json({ message: 'Please ensure there is a URL and a Title' });
  }
}

async function checkTabIDIsValid(req, res, next) {
  const { id } = req.params;
  const validTab = await db.getTabByID(id);
  if (validTab) {
    req.userID = validTab.user_id;
    next();
  } else {
    res.status(400).json({ message: 'Invalid ID for Tab' });
  }
}

module.exports = {
  checkPostIsValid,
  checkTabIDIsValid,
};
