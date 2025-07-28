/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable()
            .references('id').inTable('user').onDelete('CASCADE');
        table.decimal('total_price', 10, 2).notNullable();
        table.enum('status', ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']).defaultTo('pending');
        table.string('order_type').notNullable(); // dine-in or delivery
        table.string('dine_in_table').nullable(); // if dine-in
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders');
};
