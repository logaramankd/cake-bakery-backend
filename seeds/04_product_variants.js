/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('product_variants').del();
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');

  await knex('product_variants').insert([
    // Chocolate Truffle
    { id: 1, product_id: 1, variant_name: '0.5kg', price: 250.00 },
    { id: 2, product_id: 1, variant_name: '1kg', price: 450.00 },

    // Vanilla Delight
    { id: 3, product_id: 2, variant_name: '0.5kg', price: 200.00 },
    { id: 4, product_id: 2, variant_name: '1kg', price: 400.00 },

    // Fresh Mango Juice
    { id: 5, product_id: 3, variant_name: '250ml', price: 60.00 },

    // Orange Blast
    { id: 6, product_id: 4, variant_name: '250ml', price: 50.00 },

    // Motichoor Ladoo
    { id: 7, product_id: 5, variant_name: '500g', price: 180.00 },

    // Kaju Barfi
    { id: 8, product_id: 6, variant_name: '500g', price: 300.00 },

    // Samosa
    { id: 9, product_id: 7, variant_name: '1 piece', price: 20.00 },

    // Kachori
    { id: 10, product_id: 8, variant_name: '1 piece', price: 25.00 },

    // French Fries
    { id: 11, product_id: 9, variant_name: 'Medium', price: 70.00 },

    // Peri Peri Fries
    { id: 12, product_id: 10, variant_name: 'Large', price: 90.00 }
  ]);
};

