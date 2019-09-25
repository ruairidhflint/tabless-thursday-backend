
exports.seed = function (knex) {
  return knex('tabs').del()
    .then(() => {
      return knex('tabs').insert([
        {
          id: 1, url: 'https://www.google.com', title: 'Google Homepage', notes: 'The evil homepage that everybody cannot help but use', user_id: 1,
        },
        {
          id: 2, url: 'https://www.reddit.com', title: 'Reddit', notes: 'Reddit - Frontpage of the internet', user_id: 1,
        },
        {
          id: 7, url: 'https://www.theguardian.com/books/2019/sep/20/stieg-larsson-and-the-unsolved-case-of-olof-palme', title: 'Stieg Larsson article', notes: 'About the Prime Minister who was assassinated.', user_id: 1,
        },
        {
          id: 3, url: 'https://www.youtube.com/watch?v=hiiEeMN7vbQ&t=274s', title: 'Developing a Growth Mindset with Carol Dweck', notes: 'Video recommended by Isaac', user_id: 1,
        },
        {
          id: 4, url: 'https://open.spotify.com/search/time', title: 'Hans Zimmer Song', notes: 'From that space film', user_id: 2,
        },
        {
          id: 5, url: 'https://codeselfstudy.com/blog/deploy-node-postgres-heroku/', title: 'Postgres blog', notes: 'How to deploy a postgres app to Heroku', user_id: 2,
        },
        {
          id: 6, url: 'https://learn.lambdaschool.com/web4node/module/rec5J23yAIdjmFbgP/', title: 'Lambda TK on Data', notes: 'Used this a lot in building this backend.', user_id: 2,
        },
      ]);
    });
};
