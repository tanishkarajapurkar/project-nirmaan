const mongoose = require('mongoose');

const round2OptionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['terrain', 'role', 'budget']
    },
    text: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    sfxId: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Round2Option', round2OptionSchema);
