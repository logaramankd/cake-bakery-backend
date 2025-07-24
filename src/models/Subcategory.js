const { Model } = require("objection");
const { from } = require("../../db");

class Subcategory extends Model {
    static get tableName() {
        return 'subcategories'
    }
    static get id() {
        return 'id'
    }
    static get relationMapping() {
        const Category = require('./Category')
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass:Category,
                join:{
                    from:'subcategories.category_id',
                    to:'categories.id'
                },
            },
        };
    }
}
module.exports=Subcategory