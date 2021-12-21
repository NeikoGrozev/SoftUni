const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    paintTechnique: { type: String, required: true },
    artPicture: { type: String, required: true },
    certificate: { type: String, required: true, enum: ['Yes', 'No'] },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    usersShared: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

module.exports = model('Publication', schema);