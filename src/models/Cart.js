const { Model } = require("objection");

class Cart extends Model {
    static get tableName() {
        return 'cart'
    }
    static get idColumn() {
        return 'id'
    }
    static get relationMappings() {
        const User = require('./User');
        const ProductVariant = require('./ProductVariant');

        return {
            user: {
                user: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: User,
                    join: {
                        from: 'cart.user_id',
                        to: 'users.id'
                    }
                },
                variant: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: ProductVariant,
                    join: {
                        from: 'cart.product_variant_id',
                        to: 'product_variants.id'
                    }
                }
            }
        }
    }
}
module.exports = Cart;