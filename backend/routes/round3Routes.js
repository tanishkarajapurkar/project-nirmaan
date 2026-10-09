const express = require('express');
const router = express.Router();
const {
    getPuzzles,
    createPuzzle,
    updatePuzzle,
    deletePuzzle,
    getSessions,
    recordSession,
    getLeaderboard
} = require('../controllers/round3Controller');

// Puzzles routes
router.get('/puzzles', getPuzzles);
router.post('/puzzles', createPuzzle);
router.put('/puzzles/:id', updatePuzzle);
router.delete('/puzzles/:id', deletePuzzle);

// Defusal sessions & leaderboard
router.get('/sessions', getSessions);
router.post('/session', recordSession);
router.post('/sessions', recordSession);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
