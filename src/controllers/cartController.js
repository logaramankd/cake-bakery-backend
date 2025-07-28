const Cart = require('../models/Cart')

exports.addToCart = async (req, res) => {
    console.log('cart added');//this shown

    try {
        //but these dont why
        const { items } = req.body;
        const user_id = req.user.id;
        console.log('userid:', user_id);
        const Item = items.map(item => ({
            user_id,
            product_variant_id: item.product_variant_id,
            quantity: item.quantity,
            addon_id: item.addon_id || null
        }))
        console.log(Item);
         const insertedItems = await Cart.query().insertGraph(Item);
        res.status(201).json({ item: insertedItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getUserCart = async (req, res) => {
    try {
        const user_id = req.user.id;
        const items = await Cart.query().where('user_id', user_id).withGraphFetched('product_variant');
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
exports.removeCartItem = async (req, res) => {
    try {
        const id = req.params.id;
        await Cart.query().deleteById(id);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}