/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('subcategories', table => {
        table.increments('id').primary();
        table.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('description').nullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('subcategories')
};
