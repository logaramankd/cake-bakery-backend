/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('order_status_history', (table) => {
        table.increments('id').primary();
        table.integer('order_id').unsigned().notNullable()
            .references('id').inTable('orders').onDelete('CASCADE');
        table.enum('status', ['pending', 'accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'])
            .notNullable();
        table.integer('changed_by_user_id').unsigned().nullable()
            .references('id').inTable('user').onDelete('SET NULL');
        table.timestamp('changed_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('order_status_history');
};
