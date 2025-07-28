/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function (knex) {
  await knex('products').del();
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');
  await knex('products').insert([
    // Cakes
    { id: 1, category_id: 1, subcategory_id: 1, name: 'Chocolate Truffle', description: 'Rich and creamy chocolate cake', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\cake\black Forest cake.jpg" },
    { id: 2, category_id: 1, subcategory_id: 2, name: 'Vanilla Delight', description: 'Classic vanilla cake', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\cake\vannila.jpg" },

    // Juices
    { id: 3, category_id: 2, subcategory_id: 3, name: 'Fresh Mango Juice', description: 'Sweet and thick mango juice', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\juices\Peach Lemonade.jpg" },
    { id: 4, category_id: 2, subcategory_id: 4, name: 'Orange Blast', description: 'Tangy orange juice', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\juices\orange.jpg" },

    // Sweets
    { id: 5, category_id: 3, subcategory_id: 5, name: 'Motichoor Ladoo', description: 'Soft and sweet ladoos', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\Sweets\Gulab Jamun in Kunafa Nests _ A fusion of Indian and Middle Eastern flavours.jpg" },
    { id: 6, category_id: 3, subcategory_id: 6, name: 'Kaju Barfi', description: 'Cashew sweet barfi', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\Sweets\Fruit custard recipe (Fruit salad with custard) - Swasthi's Recipes.jpg" },

    // Hots
    { id: 7, category_id: 4, subcategory_id: 7, name: 'Crispy Samosa', description: 'Stuffed potato samosa', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\fries\Samosa.jpg" },
    { id: 8, category_id: 4, subcategory_id: 8, name: 'Spicy Kachori', description: 'Hot and spicy kachori', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\fries\corn.jpg" },

    // Fries
    { id: 9, category_id: 5, subcategory_id: 9, name: 'Classic French Fries', description: 'Golden and crispy fries', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\fries\Sabudana Vada Bombs.jpg" },
    { id: 10, category_id: 5, subcategory_id: 10, name: 'Peri Peri Fries', description: 'Spicy peri peri fries', image_url: "C:\Users\Logaraman\Desktop\Projects\asset\fries\Rolls with 🍅 ketchup.jpg" }
  ]);
};

