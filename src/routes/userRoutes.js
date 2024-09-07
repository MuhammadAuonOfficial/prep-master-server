const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/:id', authMiddleware.protect, userController.getUser);
router.get('/', authMiddleware.protect, userController.getUsers);
router.post('/', authMiddleware.protect, userController.createUser);
router.put('/:id', authMiddleware.protect, userController.updateUser);
router.delete('/:id', authMiddleware.protect, userController.deleteUser);

module.exports = router;
