const mongoose = require('mongoose');

const round3SessionSchema = new mongoose.Schema({
    teamNumber: {
        type: Number,
        required: true
    },
    teamName: {
        type: String,
        default: function() {
            return `TEAM ${this.teamNumber}`;
        }
    },
    setNumber: {
        type: Number,
        default: 1
    },
    currentLevel: {
        type: Number,
        default: 1
    },
    correctCount: {
        type: Number,
        default: 0
    },
    totalQuestions: {
        type: Number,
        default: 5
    },
    wiresCut: {
        type: [Number], // array of cut wire numbers e.g. [1, 2, 3]
        default: []
    },
    wiresDefused: {
        type: [Number], // array of defused wire numbers e.g. [1, 2]
        default: []
    },
    questionResults: {
        type: Array,
        default: []
    },
    timeLeftMs: {
        type: Number,
        default: 90000
    },
    timeTakenSeconds: {
        type: Number,
        default: 0
    },
    penaltiesCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['in-progress', 'defused', 'detonated'],
        default: 'in-progress'
    },
    score: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Round3Session', round3SessionSchema);
