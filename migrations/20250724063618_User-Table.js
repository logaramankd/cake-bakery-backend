/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table.

// Fields: id, name, email, password, role, timestamps.

// role can be: customer, admin, staff, delivery.
exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').primary();
        table.string('userName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.enum('role', ['customer', 'admin', 'staff', 'delivery']).defaultTo('customer')
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('user')
};
