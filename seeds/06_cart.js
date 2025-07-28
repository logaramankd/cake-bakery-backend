/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cart').del();
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');
  await knex('cart').insert([
    {
      id: 1,
      user_id: 1, // Logaraman
      product_variant_id: 1,
      addon_id: 1, // Extra Cheese
      quantity: 2
    },
    {
      id: 2,
      user_id: 3, // Deepa
      product_variant_id: 2,
      addon_id: null,
      quantity: 1
    },
    {
      id: 3,
      user_id: 1,
      product_variant_id: 3,
      addon_id: 2,
      quantity: 3
    }
  ]);
};
