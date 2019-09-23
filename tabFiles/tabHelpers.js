const db = require('../database/dbConfig');

function getAllTabs() {
  return db('tabs');
}

module.exports = {
  getAllTabs,
};
