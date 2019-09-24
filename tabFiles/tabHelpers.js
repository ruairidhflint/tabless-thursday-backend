const db = require('../database/dbConfig');

function getAllTabs() {
  return db('tabs');
}

function getUsersTabs(userID) {
  return db('tabs')
    .where({ user_id: userID });
}

function postNewTabByUserID(newTab) {
  return db('tabs')
    .insert(newTab);
}
module.exports = {
  getAllTabs,
  getUsersTabs,
  postNewTabByUserID,
};
