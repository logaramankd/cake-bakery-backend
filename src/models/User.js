const { Model } = require("objection");

class User extends Model {
    static get tableName() {
        return 'user'
    }
    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['userName', 'email', 'password'],
            properties: {
                id: { type: 'integer' },
                userName: { type: 'string', minLength: 3, maxLength: 100 },
                email: { type: 'string'},
                password: { type: 'string', minLength: 6 },
                role: { type: 'string', enum: ['customer', 'admin', 'staff', 'delivery'] }
            }
        }
    }
}
module.exports=User