const Round3Puzzle = require('../models/Round3Puzzle');
const Round3Session = require('../models/Round3Session');

// Get all Round 3 puzzles (sorted by level)
exports.getPuzzles = async (req, res) => {
    try {
        const puzzles = await Round3Puzzle.find().sort({ level: 1 });
        res.json({ success: true, count: puzzles.length, data: puzzles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a puzzle
exports.createPuzzle = async (req, res) => {
    try {
        const puzzle = await Round3Puzzle.create(req.body);
        res.status(201).json({ success: true, data: puzzle });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update puzzle
exports.updatePuzzle = async (req, res) => {
    try {
        const updated = await Round3Puzzle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Puzzle not found' });
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete puzzle
exports.deletePuzzle = async (req, res) => {
    try {
        const deleted = await Round3Puzzle.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Puzzle not found' });
        }
        res.json({ success: true, message: 'Puzzle deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all defusal sessions / attempts
exports.getSessions = async (req, res) => {
    try {
        const sessions = await Round3Session.find().sort({ createdAt: -1 });
        res.json({ success: true, count: sessions.length, data: sessions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Record or update session for a team
exports.recordSession = async (req, res) => {
    try {
        const { teamNumber, teamName, currentLevel, wiresCut, timeLeftMs, timeTakenSeconds, penaltiesCount, status, score } = req.body;
        
        if (!teamNumber) {
            return res.status(400).json({ success: false, message: 'teamNumber is required' });
        }

        const session = await Round3Session.findOneAndUpdate(
            { teamNumber },
            {
                teamNumber,
                teamName: teamName || `TEAM ${teamNumber}`,
                currentLevel: currentLevel || 1,
                wiresCut: wiresCut || [],
                timeLeftMs: timeLeftMs !== undefined ? timeLeftMs : 90000,
                timeTakenSeconds: timeTakenSeconds || (90 - Math.round((timeLeftMs || 0) / 1000)),
                penaltiesCount: penaltiesCount || 0,
                status: status || 'in-progress',
                score: score || (status === 'defused' ? Math.max(10, Math.round((timeLeftMs || 0) / 1000)) : 0)
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ success: true, data: session });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const sessions = await Round3Session.find()
            .sort({ status: 1, timeTakenSeconds: 1, penaltiesCount: 1 });
        res.json({ success: true, count: sessions.length, data: sessions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
