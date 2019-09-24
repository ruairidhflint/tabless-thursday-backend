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

module.exports = {
  getUserByEmail,
  addNewUser,
};
