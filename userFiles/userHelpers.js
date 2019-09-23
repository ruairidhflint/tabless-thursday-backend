const db = require('../database/dbConfig');

function getAllUserEmails() {
  return db('users')
    .select('email');
}

function addNewUser(newUser) {
  return db('users')
    .insert(newUser);
}

module.exports = {
  getAllUserEmails,
  addNewUser,
};
