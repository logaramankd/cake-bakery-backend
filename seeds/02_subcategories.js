/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('subcategories').del();
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');
 await knex('subcategories').insert([
    // Cakes
    { id: 1, category_id: 1, name: 'Chocolate Cake', description: 'Rich and moist chocolate cake topped with creamy ganache.' },
    { id: 2, category_id: 1, name: 'Vanilla Cake', description: 'Classic vanilla sponge layered with whipped cream.' },

    // Juices
    { id: 3, category_id: 2, name: 'Mango Juice', description: 'Freshly squeezed mango juice with natural sweetness.' },
    { id: 4, category_id: 2, name: 'Orange Juice', description: 'Zesty and tangy orange juice full of vitamin C.' },

    // Sweets
    { id: 5, category_id: 3, name: 'Ladoo', description: 'Traditional Indian sweet made with gram flour and ghee.' },
    { id: 6, category_id: 3, name: 'Barfi', description: 'Delicious milk-based sweet flavored with cardamom.' },

    // Hots
    { id: 7, category_id: 4, name: 'Samosa', description: 'Spicy potato filling wrapped in crispy pastry.' },
    { id: 8, category_id: 4, name: 'Kachori', description: 'Deep-fried snack filled with spiced lentils or peas.' },

    // Fries
    { id: 9, category_id: 5, name: 'French Fries', description: 'Crispy potato fries with a golden crunch.' },
    { id: 10, category_id: 5, name: 'Peri Peri Fries', description: 'Spicy peri peri-seasoned fries with a bold flavor.' }
  ]);
};

