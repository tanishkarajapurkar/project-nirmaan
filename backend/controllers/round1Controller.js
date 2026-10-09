const Round1Question = require('../models/Round1Question');
const Round1Match = require('../models/Round1Match');

// Get all Round 1 questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Round1Question.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        
        // If frontend requests "game" format, convert to { q, a1, p1, ... }
        if (req.query.format === 'game') {
            const formatted = questions.map(q => q.toGameFormat());
            return res.json({ success: true, count: formatted.length, data: formatted });
        }

        res.json({ success: true, count: questions.length, data: questions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Round1Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.json({ success: true, data: question });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const { question, order, answers, category } = req.body;
        const newQuestion = await Round1Question.create({
            question,
            order: order || 0,
            answers: answers || [],
            category: category || 'College Life'
        });
        res.status(201).json({ success: true, data: newQuestion });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update question
exports.updateQuestion = async (req, res) => {
    try {
        const updated = await Round1Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
    try {
        const deleted = await Round1Question.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.json({ success: true, message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get latest active match state (or create default)
exports.getMatchState = async (req, res) => {
    try {
        let match = await Round1Match.findOne().sort({ createdAt: -1 });
        if (!match) {
            match = await Round1Match.create({
                teamA: { name: 'TEAM A', score: 0, strikes: 0 },
                teamB: { name: 'TEAM B', score: 0, strikes: 0 },
                currentQuestionIndex: 0,
                status: 'active'
            });
        }
        res.json({ success: true, data: match });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update match state
exports.updateMatchState = async (req, res) => {
    try {
        let match = await Round1Match.findOne().sort({ createdAt: -1 });
        if (!match) {
            match = new Round1Match();
        }

        const { teamA, teamB, currentQuestionIndex, status, winner, notes } = req.body;
        if (teamA) {
            if (teamA.name !== undefined) match.teamA.name = teamA.name;
            if (teamA.score !== undefined) match.teamA.score = teamA.score;
            if (teamA.strikes !== undefined) match.teamA.strikes = teamA.strikes;
        }
        if (teamB) {
            if (teamB.name !== undefined) match.teamB.name = teamB.name;
            if (teamB.score !== undefined) match.teamB.score = teamB.score;
            if (teamB.strikes !== undefined) match.teamB.strikes = teamB.strikes;
        }
        if (currentQuestionIndex !== undefined) match.currentQuestionIndex = currentQuestionIndex;
        if (status) match.status = status;
        if (winner !== undefined) match.winner = winner;
        if (notes !== undefined) match.notes = notes;

        await match.save();
        res.json({ success: true, data: match });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Reset match state
exports.resetMatchState = async (req, res) => {
    try {
        let match = await Round1Match.findOne().sort({ createdAt: -1 });
        if (!match) {
            match = new Round1Match();
        }
        match.teamA.score = 0;
        match.teamA.strikes = 0;
        match.teamB.score = 0;
        match.teamB.strikes = 0;
        match.currentQuestionIndex = 0;
        match.status = 'active';
        match.winner = null;

        await match.save();
        res.json({ success: true, message: 'Match reset successfully', data: match });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
