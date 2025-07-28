/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('order_items', (table) => {
        table.increments('id').primary();
        table.integer('order_id').unsigned().notNullable()
            .references('id').inTable('orders').onDelete('CASCADE');
        table.integer('product_variant_id').unsigned().notNullable()
            .references('id').inTable('product_variants').onDelete('CASCADE');
        table.integer('addon_id').unsigned().nullable()
            .references('id').inTable('addons').onDelete('SET NULL');
        table.integer('quantity').defaultTo(1);
        table.decimal('price', 10, 2).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('order_items');
};
