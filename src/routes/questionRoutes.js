const express = require('express');
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/:id', authMiddleware.protect, questionController.getquestion);
router.get('/', authMiddleware.protect, questionController.getAllquestion);
router.get('/testId/:id', authMiddleware.protect, questionController.getquestionByTestId);

router.post('/', authMiddleware.protect, questionController.createquestion);
router.put('/:id', authMiddleware.protect, questionController.updatequestion);
router.delete('/:id', authMiddleware.protect, questionController.deletequestion);

module.exports = router;
