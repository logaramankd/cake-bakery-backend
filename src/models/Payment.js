const { Model } = require('objection');

class Payment extends Model {
  static get tableName() {
    return 'payments';
  }

  static get relationMappings() {
    const Invoice = require('./Invoice');
    return {
      invoice: {
        relation: Model.BelongsToOneRelation,
        modelClass: Invoice,
        join: {
          from: 'payments.invoice_id',
          to: 'invoices.id',
        },
      },
    };
  }
}
module.exports = Payment;
