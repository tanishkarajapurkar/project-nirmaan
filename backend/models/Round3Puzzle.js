const mongoose = require('mongoose');

const round3PuzzleSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true
    },
    clue: {
        type: String,
        required: true
    },
    componentName: {
        type: String,
        required: true
    },
    wireNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    hint: {
        type: String,
        default: ''
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Round3Puzzle', round3PuzzleSchema);
