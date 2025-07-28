/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cart', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE')
        table.integer('product_variant_id').unsigned().notNullable()
            .references('id').inTable('product_variants').onDelete('CASCADE');
        table.integer('addon_id').unsigned().nullable()
            .references('id').inTable('addons').onDelete('SET NULL');
        table.integer('quantity').defaultTo(1);
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cart')
};
