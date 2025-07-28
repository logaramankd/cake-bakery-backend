const { Model } = require("objection");

class ProductVariant extends Model {
    static get tableName() {
        return 'product_variants';
    }
    static get idColumn() {
        return 'id';
    }
    static get relationMappings() {
        const Product = require('../models/Product')
        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'product_variants.product_id',
                    to: 'products.id'
                }
            }
        }
    }
}
module.exports = ProductVariant