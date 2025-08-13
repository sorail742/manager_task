const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth')
const { validate } = require('../middelware/validation')
const taskSchema = require('../validations/taskValidation');
const {
  createTask,
  updateTask,
  deleteTask,
  listTasks
} = require('../controllers/taskController');

// 📌 Liste avec filtres et tri
router.get('/', auth, listTasks);

// 📌 Création
router.post('/', auth, validate(taskSchema), createTask);

// 📌 Modification
router.put('/:id', auth, validate(taskSchema), updateTask);

// 📌 Suppression
router.delete('/:id', auth, deleteTask);

module.exports = router;
