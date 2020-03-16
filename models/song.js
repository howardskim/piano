const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    }
})

const songSchema = new mongoose.Schema({
    notes: [noteSchema]
})

module.exports = mongoose.model('Song', songSchema);