const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = new Schema({
    email:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    auth_tokens: {
        type: [String],
        select: false
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    },
});

UserSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}


const UserModel = new Model('User', UserSchema);

module.exports = UserModel;