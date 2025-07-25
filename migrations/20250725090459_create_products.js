
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.integer('category_id').unsigned().notNullable()
            .references('id').inTable('categories').onDelete('CASCADE');
        table.integer('subcategory_id').unsigned().notNullable()
            .references('id').inTable('subcategories').onDelete('CASCADE');
        table.string('name').notNullable();
        table.text('description').nullable();
        table.string('image_url').nullable();
        table.boolean('available').defaultTo(true);
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('products')
};
