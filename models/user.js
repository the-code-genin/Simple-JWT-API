const db = require('../db');

module.exports = db.model('User', {
    tableName: 'users',
    hasTimestamps: true,
    hidden: ['password'],
    authTokens() {
        return this.hasMany('UserAuthToken');
    }
});