const db = require('../db');
require('./user_auth_token');

module.exports = db.model('User', {
    tableName: 'users',
    hasTimestamps: true,
    hidden: ['password', 'authTokens'],
    authTokens() {
        return this.hasMany('UserAuthToken');
    }
});