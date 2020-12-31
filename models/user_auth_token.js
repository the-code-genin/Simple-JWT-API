const db = require('../db');
require('./user');

module.exports = db.model('UserAuthToken', {
    tableName: 'user_auth_tokens',
    hasTimestamps: true,
    user() {
      return this.belongsTo('User')
    }
});