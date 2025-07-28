const { Model } = require("objection");
const { from } = require("../../db");

class Subcategory extends Model {
    static get tableName() {
        return 'subcategories'
    }
    static get id() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'description', 'category_id'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string', minLength: 1, maxLength: 1000 },
                category_id: { type: 'integer' },
            },
        };
    }
    static get relationMapping() {
        const Category = require('./Category')
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'subcategories.category_id',
                    to: 'categories.id'
                },
            },
        };
    }
}
module.exports = Subcategory