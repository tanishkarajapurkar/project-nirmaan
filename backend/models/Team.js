const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamNumber: {
        type: Number,
        required: true,
        unique: true
    },
    teamName: {
        type: String,
        required: true,
        trim: true
    },
    round1Score: {
        type: Number,
        default: 0
    },
    round2Data: {
        terrain: { type: String, default: null },
        role: { type: String, default: null },
        budget: { type: String, default: null }
    },
    round3Data: {
        defused: { type: Boolean, default: false },
        timeTakenSeconds: { type: Number, default: 0 },
        score: { type: Number, default: 0 }
    },
    totalScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

teamSchema.methods.recalculateTotal = function() {
    this.totalScore = (this.round1Score || 0) + (this.round3Data?.score || 0);
    return this.totalScore;
};

module.exports = mongoose.model('Team', teamSchema);
