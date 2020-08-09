const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = new Schema({
    email:  String,
    password: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


const UserModel = new Model('User', UserSchema);

module.exports = UserModel;