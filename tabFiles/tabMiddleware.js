// const db = require('./tabHelpers');

function checkPostIsValid(req, res, next) {
  const { url, title } = req.body;
  if (url && title) {
    next();
  } else {
    res.status(500).json({ message: 'Please ensure there is a URL and a Title' });
  }
}

module.exports = {
  checkPostIsValid,
};
