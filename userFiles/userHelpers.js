const db = require('../database/dbConfig');

function getUserByEmail(email) {
  return db('users')
    .where({ email })
    .first();
}

function addNewUser(newUser) {
  return db('users')
    .insert(newUser);
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = {
  getUserByEmail,
  addNewUser,
  deleteUser,
};
