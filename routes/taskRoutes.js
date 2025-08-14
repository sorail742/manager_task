const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const taskValidation = require('../validations/taskValidation');

router.post('/', authenticate, validate(taskValidation), taskController.createTask);
router.get('/', authenticate, taskController.getTasks);
router.put('/:id', authenticate, validate(taskValidation), taskController.updateTask);
router.delete('/:id', authenticate, taskController.deleteTask);

module.exports = router;
