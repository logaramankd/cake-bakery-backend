const Order = require('../models/Order');
const User = require('../models/User');
const OrderItem = require('../models/OrderItem');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.query()
      .withGraphFetched('[user, items.[variant], statusHistory]')
      .orderBy('created_at', 'desc');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.query()
      .findById(req.params.id)
      .withGraphFetched('[user, items.[variant], statusHistory]');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
};

exports.filterOrders = async (req, res) => {
  const { status, userId, dateFrom, dateTo } = req.query;
  try {
    let query = Order.query().withGraphFetched('[user, items, statusHistory]');

    if (status) query.where('status', status);
    if (userId) query.where('user_id', userId);
    if (dateFrom) query.where('created_at', '>=', new Date(dateFrom));
    if (dateTo) query.where('created_at', '<=', new Date(dateTo));

    const filtered = await query.orderBy('created_at', 'desc');
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Error filtering orders', error: err.message });
  }
};
