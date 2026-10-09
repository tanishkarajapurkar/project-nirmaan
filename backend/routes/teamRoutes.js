const express = require('express');
const router = express.Router();
const {
    getTeams,
    syncAllRounds,
    upsertTeam,
    resetAll
} = require('../controllers/teamController');

router.get('/', getTeams);
router.post('/', upsertTeam);
router.post('/sync', syncAllRounds);
router.post('/reset-all', resetAll);

module.exports = router;
