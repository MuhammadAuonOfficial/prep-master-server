const express = require('express');
const questionOptionController = require('../controllers/questionOptionController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/:id', authMiddleware.protect, questionOptionController.getquestionOption);
router.get('/questionId/:id', authMiddleware.protect, questionOptionController.getquestionOptionByQuestionId);

router.post('/', authMiddleware.protect, questionOptionController.createquestionOption);
router.put('/:id', authMiddleware.protect, questionOptionController.updatequestionOption);
router.delete('/:id', authMiddleware.protect, questionOptionController.deletequestionOption);

module.exports = router;
