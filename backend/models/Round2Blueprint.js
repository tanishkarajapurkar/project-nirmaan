const mongoose = require('mongoose');

const round2BlueprintSchema = new mongoose.Schema({
    teamNum: {
        type: Number,
        required: true
    },
    teamName: {
        type: String,
        default: function() {
            return `TEAM ${this.teamNum}`;
        }
    },
    terrain: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Round2Blueprint', round2BlueprintSchema);
