
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1, email: 'rory@rory.com', password: '123456', name: 'Rory',
        },
        {
          id: 2, email: 'anna@anna.com', password: '123456', name: 'Anna',
        },
        {
          id: 3, email: 'gabe@postman.com', password: '123456', name: 'Gabe',
        },
      ]);
    });
};
