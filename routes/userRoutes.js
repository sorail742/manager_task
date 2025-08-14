const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', authenticate, authorize(['admin']), getAllUsers);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

module.exports = router;
