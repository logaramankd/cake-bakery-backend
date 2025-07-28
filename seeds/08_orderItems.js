/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = async function (knex) {
  await knex('order_items').del();
  await knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1');
  // 1. Get orders with user mapping
  const orders = await knex('orders').select('id', 'user_id');
  const userOrderMap = {};
  orders.forEach(order => {
    userOrderMap[order.user_id] = order.id;
  });

  // 2. Get cart items with prices
  const cartItems = await knex('cart as c')
    .leftJoin('product_variants as pv', 'c.product_variant_id', 'pv.id')
    .leftJoin('addons as a', 'c.addon_id', 'a.id')
    .select(
      'c.user_id',
      'c.product_variant_id',
      'c.addon_id',
      'c.quantity',
      'pv.price as variant_price',
      'a.price as addon_price'
    );

  const orderItems = cartItems.map((item, index) => {
    const variantPrice = Number(item.variant_price || 0);
    const addonPrice = Number(item.addon_price || 0);
    const totalPrice = (variantPrice + addonPrice) * item.quantity;

    return {
      id: index + 1,
      order_id: userOrderMap[item.user_id],
      product_variant_id: item.product_variant_id,
      addon_id: item.addon_id || null,
      quantity: item.quantity,
      price: totalPrice
    };
  });

  await knex('order_items').insert(orderItems);
};
