const { Model } = require("objection");

class Category extends Model {
    static get tableName() {
        return 'categories'
    }
    static get id() {
        return 'id'
    }
    static get jsonSchema() {

    }
    static get relationMappings() {
        const Subcategory = require('./Subcategory')
        return {
            subcategories: {
                relation: Model.HasManyRelation,
                modelClass: Subcategory,
                join: {
                    from: 'categories.id',
                    to: 'subcategories.category_id'
                }
            }
        }
    }
}
module.exports = Category