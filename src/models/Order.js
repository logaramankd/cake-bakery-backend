const { Model } = require('objection');

class Order extends Model {
    static get tableName() {
        return 'orders';
    }
static get idColumn(){
    return 'id'
}
    static get relationMappings() {
        const User = require('./User');
        const OrderItem = require('./OrderItem');
        const OrderStatusHistory=require('./OrderStatusHistory')
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'orders.user_id',
                    to: 'user.id'
                }
            },
            items: {
                relation: Model.HasManyRelation,
                modelClass: OrderItem,
                join: {
                    from: 'orders.id',
                    to: 'order_items.order_id'
                }
            },
            statusHistory: {
                relation: Model.HasManyRelation,
                modelClass: OrderStatusHistory,
                join: {
                    from: 'orders.id',
                    to: 'order_status_history.order_id'
                }
            }
        };
    }
}

module.exports = Order;
