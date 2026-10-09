const mongoose = require('mongoose');

const round1MatchSchema = new mongoose.Schema({
    teamA: {
        name: { type: String, default: 'TEAM A' },
        score: { type: Number, default: 0 },
        strikes: { type: Number, default: 0 }
    },
    teamB: {
        name: { type: String, default: 'TEAM B' },
        score: { type: Number, default: 0 },
        strikes: { type: Number, default: 0 }
    },
    currentQuestionIndex: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'paused'],
        default: 'active'
    },
    winner: {
        type: String,
        default: null
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Round1Match', round1MatchSchema);
