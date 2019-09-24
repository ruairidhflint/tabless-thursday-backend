
exports.seed = function (knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1, email: 'rory@rory.co.uk', password: '$2b$12$1wrBzbmjE3S5RBq7ZKi.WeKAk01rav6dCANAPpOAkmv5s6A9t82yi', name: 'Rory',
        },
        {
          id: 2, email: 'anna@anna.co.uk', password: '$2b$12$xNTM1jvwUYgm6pDIRGst2.uBCm4X6uFlnl6p6tvl/eue22rka.dwm', name: 'Anna',
        },
        {
          id: 3, email: 'gabe@postman.co.uk', password: '$2b$12$jbiVHqCwjx2ja6wcvMeTTOV.XSko7fxgxmj2fj/yWPxp5q4mc.VfS', name: 'Gabe',
        },
      ]);
    });
};
