/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = async function (knex) {
  await knex('orders').del();
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');
  // Fetch cart items with product_variant and addon pricing
  const cartItems = await knex('cart as c')
    .leftJoin('product_variants as pv', 'c.product_variant_id', 'pv.id')
    .leftJoin('addons as a', 'c.addon_id', 'a.id')
    .select(
      'c.user_id',
      'c.quantity',
      'pv.price as variant_price',
      'a.price as addon_price'
    );

  // Group by user_id
  const userOrders = {};

  cartItems.forEach(item => {
    const variantPrice = Number(item.variant_price || 0);
    const addonPrice = Number(item.addon_price || 0);
    const totalItemPrice = (variantPrice + addonPrice) * item.quantity;

    if (!userOrders[item.user_id]) {
      userOrders[item.user_id] = 0;
    }

    userOrders[item.user_id] += totalItemPrice;
  });

  // Create order rows
  const now = new Date();
  const orderRows = Object.entries(userOrders).map(([user_id, total_price], index) => ({
    id: index + 1,
    user_id: Number(user_id),
    total_price,
    status: 'pending',
    order_type: 'dine-in',
    dine_in_table: `T${index + 1}`,
    created_at: now,
    updated_at: now,
  }));

  await knex('orders').insert(orderRows);
};
