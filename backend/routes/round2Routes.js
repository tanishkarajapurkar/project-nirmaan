const express = require('express');
const router = express.Router();
const {
    getOptions,
    createOption,
    getBlueprints,
    createBlueprint,
    deleteBlueprint,
    clearBlueprints
} = require('../controllers/round2Controller');

// Master blueprint options (terrains, roles, budgets)
router.get('/options', getOptions);
router.post('/options', createOption);

// Assigned team blueprints
router.get('/teams', getBlueprints);
router.get('/history', getBlueprints);
router.post('/teams', createBlueprint);
router.delete('/teams/:id', deleteBlueprint);
router.delete('/history', clearBlueprints);

module.exports = router;
