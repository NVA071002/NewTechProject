const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');     

const userSchema = new mongoose.Schema({
    name: {type: String},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    access_token: {type: String , require: false},
    refresh_token: {type: String, require: false},
    role: {type: String},
}); 

module.exports = mongoose.model('User', userSchema);