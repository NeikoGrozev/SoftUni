const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, maxlength: 50 },
    imageUrl: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    createdData: { type: Date, default: Date.now },
    userLaked: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Play', schema);