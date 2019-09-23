const db = require('../database/dbConfig');

function getAllUserEmails() {
  return db('users')
    .select('email');
}

function getUserByEmail(email) {
  return db('users')
    .where({ email })
    .select('email');
}

function addNewUser(newUser) {
  return db('users')
    .insert(newUser);
}

module.exports = {
  getAllUserEmails,
  getUserByEmail,
  addNewUser,
};
