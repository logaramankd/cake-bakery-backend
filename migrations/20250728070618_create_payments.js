/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
// migrations/xxxx_create_payments.js
exports.up = function(knex) {
  return knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table.integer('invoice_id').unsigned().notNullable()
      .references('id').inTable('invoices').onDelete('CASCADE');
    table.string('payment_method').notNullable(); // e.g., card, UPI, COD
    table.decimal('amount_paid', 10, 2).notNullable();
    table.enum('status', ['success', 'failed', 'pending']).defaultTo('pending');
    table.string('transaction_id').nullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('payments');
};
