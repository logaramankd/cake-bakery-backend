const { Model } = require('objection');

class OrderItem extends Model {
    static get tableName() {
        return 'order_items';
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['order_id', 'product_variant_id', 'price'],

            properties: {
                id: { type: 'integer' },
                order_id: { type: 'integer' },
                product_variant_id: { type: 'integer' },
                addon_id: { type: ['integer', 'null'] },
                quantity: { type: 'integer', minimum: 1 },
                price: { type: 'number' }
            }
        };
    }

    static get relationMappings() {
        const Order = require('./Order');
        const ProductVariant = require('./ProductVariant');
        const Addon = require('./Addon');
        return {
            order: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'order_items.order_id',
                    to: 'orders.id'
                }
            },
            variant: {
                relation: Model.BelongsToOneRelation,
                modelClass: ProductVariant,
                join: {
                    from: 'order_items.product_variant_id',
                    to: 'product_variants.id'
                }
            },
            addon: {
                relation: Model.BelongsToOneRelation,
                modelClass: Addon,
                join: {
                    from: 'order_items.addon_id',
                    to: 'addons.id'
                }
            },
        };
    }
}

module.exports = OrderItem;