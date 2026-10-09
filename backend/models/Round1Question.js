const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    rank: { type: Number, required: true },
    text: { type: String, required: true },
    points: { type: Number, required: true, default: 0 }
}, { _id: false });

const round1QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question prompt is required'],
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    answers: [answerSchema],
    category: {
        type: String,
        default: 'College Life'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Format compatibility for the frontend (a1, p1, a2, p2 ...)
round1QuestionSchema.methods.toGameFormat = function() {
    const formatted = {
        _id: this._id,
        q: this.question,
        order: this.order
    };
    if (this.answers && Array.isArray(this.answers)) {
        this.answers.forEach((ans, index) => {
            const idx = index + 1;
            formatted[`a${idx}`] = ans.text;
            formatted[`p${idx}`] = ans.points;
        });
    }
    return formatted;
};

module.exports = mongoose.model('Round1Question', round1QuestionSchema);
