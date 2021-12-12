const { Schema, model } = require('mongoose');

const schema = new Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, minlength: 5 },
    hashedPassword: { type: String, required: true, minlength: 4 }
});

module.exports = model('User', schema);