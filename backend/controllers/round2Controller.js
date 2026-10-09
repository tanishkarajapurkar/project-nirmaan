const Round2Option = require('../models/Round2Option');
const Round2Blueprint = require('../models/Round2Blueprint');

// Get master blueprint options (terrains, roles, budgets)
exports.getOptions = async (req, res) => {
    try {
        const options = await Round2Option.find({ isActive: true });
        
        const grouped = {
            terrains: options.filter(o => o.category === 'terrain'),
            roles: options.filter(o => o.category === 'role'),
            budgets: options.filter(o => o.category === 'budget')
        };

        res.json({ success: true, count: options.length, data: grouped, all: options });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add master option
exports.createOption = async (req, res) => {
    try {
        const option = await Round2Option.create(req.body);
        res.status(201).json({ success: true, data: option });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all assigned team blueprints (team history)
exports.getBlueprints = async (req, res) => {
    try {
        const blueprints = await Round2Blueprint.find().sort({ teamNum: 1 });
        res.json({ success: true, count: blueprints.length, data: blueprints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Record an assigned blueprint for a team
exports.createBlueprint = async (req, res) => {
    try {
        const { teamNum, teamName, terrain, role, budget, notes } = req.body;
        
        if (!teamNum || !terrain || !role || !budget) {
            return res.status(400).json({ success: false, message: 'teamNum, terrain, role, and budget are required.' });
        }

        // Upsert by teamNum so re-spinning a team updates its record or adds new
        const blueprint = await Round2Blueprint.findOneAndUpdate(
            { teamNum },
            { 
                teamNum, 
                teamName: teamName || `TEAM ${teamNum}`, 
                terrain, 
                role, 
                budget, 
                notes: notes || '' 
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(201).json({ success: true, data: blueprint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete single blueprint
exports.deleteBlueprint = async (req, res) => {
    try {
        const deleted = await Round2Blueprint.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Blueprint not found' });
        }
        res.json({ success: true, message: 'Blueprint deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Clear all blueprints history
exports.clearBlueprints = async (req, res) => {
    try {
        await Round2Blueprint.deleteMany({});
        res.json({ success: true, message: 'All Round 2 team blueprint records cleared' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
