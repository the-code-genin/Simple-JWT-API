const db = require('../db');

module.exports = db.model('UserAuthToken', {
    tableName: 'user_auth_tokens',
    hasTimestamps: true,
    user() {
      return this.belongsTo('User')
    }
});