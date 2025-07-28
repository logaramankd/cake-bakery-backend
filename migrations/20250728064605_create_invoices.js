exports.up = function (knex) {
  return knex.schema.createTable('invoices', (table) => {
    table.increments('id').primary();
    table.integer('order_id').unsigned().notNullable()
      .references('id').inTable('orders').onDelete('CASCADE');
    table.decimal('subtotal', 10, 2).notNullable();
    table.decimal('tax', 10, 2).defaultTo(0);
    table.decimal('total_amount', 10, 2).notNullable();
    table.timestamp('generated_at').defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('invoices');
};
