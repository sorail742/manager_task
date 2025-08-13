const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
const {validate} = require('../middelware/validation')
const userSchema = require('../validations/userValidation');
const auth = require('../middelware/auth');

router.post('/register', validate(userSchema), register);
router.post('/login', login);
router.get('/me', auth, getUser);

module.exports = router;
