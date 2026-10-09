const express = require('express');
const router = express.Router();
const {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getMatchState,
    updateMatchState,
    resetMatchState
} = require('../controllers/round1Controller');

// Question bank routes
router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestionById);
router.post('/questions', createQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

// Match & score state routes
router.get('/match', getMatchState);
router.put('/match', updateMatchState);
router.post('/match/reset', resetMatchState);

module.exports = router;
