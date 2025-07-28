/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('addons').del()
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');
  await knex('addons').insert([
    { id: 1, name: 'Extra Cheese', price: 20.00 },
    { id: 2, name: 'Chocolate Syrup', price: 15.00 },
    { id: 3, name: 'Chilli Flakes', price: 10.00 },
    { id: 4, name: 'Whipped Cream', price: 18.00 },
    { id: 5, name: 'Vanilla Scoop', price: 25.00 },
  ]);
};
