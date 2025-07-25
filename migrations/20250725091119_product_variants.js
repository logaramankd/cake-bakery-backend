/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('product_variants', (table) => {
        table.increments('id').primary()
        table.integer('product_id').unsigned().notNullable()
            .references('id').inTable('products').onDelete('CASCADE');
        table.string('variant_name').notNullable(); // Example: '0.5kg', '1kg'
        table.decimal('price', 10, 2).notNullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('product_variants')
};
