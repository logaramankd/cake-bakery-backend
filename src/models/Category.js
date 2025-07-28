const { Model } = require("objection");

class Category extends Model {
    static get tableName() {
        return 'categories'
    }
    static get id() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'description'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string', minLength: 1, maxLength: 1000 },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
            },
        };
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