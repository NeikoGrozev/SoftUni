const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    imageUrl: { type: String, required: true, match: /^https?:\/\// },
    difficulty: { type: Number, required: true, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories: [{type: Schema.Types.ObjectId, ref: 'Accessory'}]
});

module.exports = model('Cube', schema);