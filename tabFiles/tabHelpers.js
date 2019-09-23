const db = require('../database/dbConfig');

function getAllTabs() {
  return db('tabs');
}

function getUsersTabs(userID) {
  return db('tabs')
    .where({ user_id: userID });
}

module.exports = {
  getAllTabs,
  getUsersTabs,
};
