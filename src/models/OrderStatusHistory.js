const { Model } = require('objection');

class OrderStatusHistory extends Model {
    static get tableName() {
        return 'order_status_history';
    }

    static get relationMappings() {
        const Order = require('./Order');
        const User = require('./User');

        return {
            order: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'order_status_history.order_id',
                    to: 'orders.id'
                }
            },
            changedBy: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'order_status_history.changed_by_user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = OrderStatusHistory;
