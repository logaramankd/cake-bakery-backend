const { Model } = require('objection');

class Invoice extends Model {
  static get tableName() {
    return 'invoices';
  }

  static get relationMappings() {
    const Order = require('./Order');
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'invoices.order_id',
          to: 'orders.id',
        },
      },
    };
  }
}
module.exports = Invoice;
