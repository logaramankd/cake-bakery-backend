const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const ProductVariant = require('../models/ProductVariant'); // Needed for price
const OrderStatusHistory = require('../models/OrderStatusHistory');
const Addon = require('../models/Addon');

exports.placeOrder = async (req, res) => {
    console.log(req.body);

    try {
        const userId = req.user.id;
        const { order_type, dine_in_table, } = req.body;

        const cartItems = await Cart.query().where('user_id', userId);

        if (!cartItems.length) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Fetch product variant prices
        const variantIds = cartItems.map(item => item.product_variant_id);
        const variants = await ProductVariant.query().whereIn('id', variantIds);
        const priceMap = {};
        variants.forEach(variant => {
            priceMap[variant.id] = parseFloat(variant.price);
        });

        // Fetch addon prices
        const addonIds = cartItems.map(item => item.addon_id).filter(Boolean);
        let addonMap = {};
        if (addonIds.length > 0) {
            const addons = await Addon.query().whereIn('id', addonIds);
            addons.forEach(addon => {
                addonMap[addon.id] = parseFloat(addon.price);
            });
        }

        // Calculate total
        let totalPrice = 0;
        const orderItems = [];

        for (const item of cartItems) {
            const variantPrice = priceMap[item.product_variant_id];
            if (!variantPrice) {
                return res.status(400).json({ message: `Variant price not found` });
            }

            let itemPrice = variantPrice;

            // If addon exists
            if (item.addon_id && addonMap[item.addon_id]) {
                itemPrice += addonMap[item.addon_id];
            }

            const finalPrice = itemPrice * item.quantity;
            totalPrice += finalPrice;

            orderItems.push({
                order_id: null, // We'll set it after inserting order
                product_variant_id: item.product_variant_id,
                addon_id: item.addon_id || null,
                quantity: item.quantity,
                price: parseFloat(itemPrice.toFixed(2))

            });
        }

        // Create Order
        const newOrder = await Order.query().insert({
            user_id: userId,
            total_price: totalPrice.toFixed(2),
            order_type,
            dine_in_table: order_type === 'dine-in' ? dine_in_table : null,
            // delivery_address: order_type === 'delivery' ? delivery_address : null
        });
        await OrderStatusHistory.query().insert({
            order_id: newOrder.id,
            status: 'pending',
            changed_at: null // or 'system' or 0 if you want to indicate system
        });

        // Attach order_id and insert order items
        for (const item of orderItems) {
            item.order_id = newOrder.id;
        }
        for (const item of orderItems) {
            await OrderItem.query().insert(item);
        }


        await Cart.query().where('user_id', userId).delete();

        res.status(201).json({
            message: 'Order placed successfully',
            order_id: newOrder.id
        });

    } catch (err) {
        console.error('Order error:', err);
        res.status(500).json({ message: 'Error placing order' });
    }
};



exports.getUserOrders = async (req, res) => {
    const user_id = req.user.id;

    try {
        const orders = await Order.query().where('user_id', user_id).withGraphFetched('items');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const user = req.user; // Assume JWT middleware has set req.user

        // Role check
        if (user.role !== 'admin' && user.role !== 'restaurant') {
            return res.status(403).json({ message: 'Unauthorized to update order status' });
        }

        const order = await Order.query().findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        await Order.query().patchAndFetchById(orderId, { status });

        await OrderStatusHistory.query().insert({
            order_id: orderId,
            status,
            changed_by_user_id: user.id,
        });

        res.json({ message: 'Order status updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
