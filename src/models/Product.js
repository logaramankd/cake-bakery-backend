const { Model } = require("objection");
const { from, join } = require("../../db");

class Product extends Model {
    static get tableName() {
        return 'products'
    }
    static get idColumn() {
        return 'id'
    }
    static get relationMappings() {
        const ProductVariant = require('./ProductVariant')
        const Category = require('./Category')
        const Subcategory = require('./Subcategory')
        return {
            variants: {
                relation: Model.HasManyRelation,
                modelClass: ProductVariant,
                join: {
                    from: 'products.id',
                    to: 'product_variants.product_id',
                }
            },
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'products.category_id',
                    to: 'categories.id',
                },
            },
            subcategory: {
                relation: Model.BelongsToOneRelation,
                modelClass: Subcategory,
                join: {
                    from: 'products.subcategory_id',
                    to: 'subcategories.id',
                },
            },
        };
    }
}
module.exports = Product