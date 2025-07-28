/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');
  await knex('categories').insert([
    { id: 1, name: 'Cakes', description: 'All kinds of cakes' },
    { id: 2, name: 'Juices', description: 'Fresh fruit juices' },
    { id: 3, name: 'Sweets', description: 'Traditional and modern sweets' },
    { id: 4, name: 'Hots', description: 'Hot snacks and items' },
    { id: 5, name: 'Fries', description: 'Fried and crispy items' }
  ]);
};

