const db = require('../database/dbConfig');

function getAllTabs() {
  return db('tabs');
}

function getTabByID(id) {
  return db('tabs')
    .where({ id })
    .first();
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

function updateTabByID(updatedTab, id) {
  return db('tabs')
    .where({ id })
    .update(updatedTab);
}
module.exports = {
  getAllTabs,
  getTabByID,
  getUsersTabs,
  postNewTabByUserID,
  deleteTabByTabID,
  updateTabByID,
};
