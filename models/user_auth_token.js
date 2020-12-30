const db = require('../db');

module.exports = db.model('UserAuthToken', {
    tableName: 'user_auth_tokens',
    hasTimestamps: true,
});