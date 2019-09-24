const db = require('../database/dbConfig');

function getAllTabs() {
  return db('tabs');
}

function getTabByID(id) {
  return db('tabs')
    .where({ id });
}

function getUsersTabs(userID) {
  return db('tabs')
    .where({ user_id: userID });
}

function postNewTabByUserID(newTab) {
  return db('tabs')
    .insert(newTab);
}

function deleteTabByTabID(id) {
  return db('tabs')
    .where({ id })
    .del();
}
module.exports = {
  getAllTabs,
  getTabByID,
  getUsersTabs,
  postNewTabByUserID,
  deleteTabByTabID,
};
