const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['Apartment', 'Villa', 'House'] },
    year: { type: Number, required: true, min: 1850, max: 2021 },
    city: { type: String, required: true },
    imageUrl: { type: String, required: true, match: [/^https?/, 'Image must be valid URL!'] },
    description: { type: String, required: true },
    availablePieces: { type: Number, required: true, min: 0, max: 10 },
    rentedUsers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('House', schema);