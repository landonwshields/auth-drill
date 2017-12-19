
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('my_user').del()
    .then(function () {
      // Inserts seed entries
      return knex('my_user').insert([
        {
          id: 1000,
          agentName: 'Landon',
          password: 'password'
        },
        {
          id: 2000,
          agentName: 'MC',
          password: 'password'
        },
        {
          id: 3000,
          agentName: 'Britt',
          password: 'password'
        }
      ]);
    });
};
