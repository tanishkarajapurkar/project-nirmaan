const Team = require('../models/Team');
const Round1Match = require('../models/Round1Match');
const Round2Blueprint = require('../models/Round2Blueprint');
const Round3Session = require('../models/Round3Session');

// Get all teams with their consolidated round data
exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find().sort({ totalScore: -1, teamNumber: 1 });
        res.json({ success: true, count: teams.length, data: teams });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Sync all round data across Round 1, Round 2, Round 3 into master Team model
exports.syncAllRounds = async (req, res) => {
    try {
        const blueprints = await Round2Blueprint.find();
        const r3Sessions = await Round3Session.find();

        const syncedTeams = [];

        // Aggregate blueprints
        for (const bp of blueprints) {
            let team = await Team.findOne({ teamNumber: bp.teamNum });
            if (!team) {
                team = new Team({
                    teamNumber: bp.teamNum,
                    teamName: bp.teamName || `TEAM ${bp.teamNum}`
                });
            }
            team.round2Data = {
                terrain: bp.terrain,
                role: bp.role,
                budget: bp.budget
            };
            await team.save();
        }

        // Aggregate Round 3
        for (const s of r3Sessions) {
            let team = await Team.findOne({ teamNumber: s.teamNumber });
            if (!team) {
                team = new Team({
                    teamNumber: s.teamNumber,
                    teamName: s.teamName || `TEAM ${s.teamNumber}`
                });
            }
            team.round3Data = {
                defused: s.status === 'defused',
                timeTakenSeconds: s.timeTakenSeconds,
                score: s.score
            };
            team.recalculateTotal();
            await team.save();
        }

        const all = await Team.find().sort({ totalScore: -1 });
        res.json({ success: true, message: 'All rounds synchronized', count: all.length, data: all });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create or update a team
exports.upsertTeam = async (req, res) => {
    try {
        const { teamNumber, teamName, round1Score, round2Data, round3Data } = req.body;
        
        let team = await Team.findOne({ teamNumber });
        if (!team) {
            team = new Team({ teamNumber, teamName: teamName || `TEAM ${teamNumber}` });
        }
        if (teamName) team.teamName = teamName;
        if (round1Score !== undefined) team.round1Score = round1Score;
        if (round2Data) team.round2Data = round2Data;
        if (round3Data) team.round3Data = round3Data;

        team.recalculateTotal();
        await team.save();

        res.json({ success: true, data: team });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Reset all team data
exports.resetAll = async (req, res) => {
    try {
        await Team.deleteMany({});
        await Round2Blueprint.deleteMany({});
        await Round3Session.deleteMany({});
        await Round1Match.deleteMany({});
        res.json({ success: true, message: 'All match records and sessions reset successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
