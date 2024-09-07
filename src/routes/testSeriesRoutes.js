const express = require('express');
const testSeriesController = require('../controllers/testSeriesController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/:id', authMiddleware.protect, testSeriesController.getTestSeries);
router.get('/', authMiddleware.protect, testSeriesController.getAllTestSeries);
router.post('/', authMiddleware.protect, testSeriesController.createTestSeries);
router.put('/:id', authMiddleware.protect, testSeriesController.updateTestSeries);
router.delete('/:id', authMiddleware.protect, testSeriesController.deleteTestSeries);

module.exports = router;
