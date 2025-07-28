/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('user').del();
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');
  await knex('user').insert([
    {
      id: 1,
      userName: 'Logaraman',
      email: 'logaraman2403@gmail.com',
      password: 'kdram2004',
      role: 'customer'
    },
    {
      id: 2,
      userName: 'RamAdmin',
      email: 'admin@example.com',
      password: 'admin',
      role: 'admin'
    },
    {
      id: 3,
      userName: 'Deepa',
      email: 'deepa@example.com',
      password: 'deepa24',
      role: 'customer'
    }
  ]);
};
