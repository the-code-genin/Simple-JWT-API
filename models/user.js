const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.Model;

const UserModel = new Model('User', new Schema({
    email:  String,
    password: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}));

module.exports = UserModel;