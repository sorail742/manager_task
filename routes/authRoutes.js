
const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const userValidation = require('../validations/userValidation');

// 🔹 Inscription publique
router.post('/register', validate(userValidation), userController.register);

// 🔹 Admin : créer un nouvel admin
router.post('/admin', authenticate, authorizeAdmin, validate(userValidation), userController.addAdmin);

// 🔹 Admin : voir tous les utilisateurs
router.get('/', authenticate, authorizeAdmin, userController.getAllUsers);

// 🔹 Admin : supprimer un utilisateur
router.delete('/:id', authenticate, authorizeAdmin, userController.deleteUser);

// 🔹 Membre ou Admin : voir son profil
router.get('/me', authenticate, userController.getMyProfile);

// 🔹 Membre ou Admin : ajouter un membre
router.post('/members', authenticate, validate(userValidation), userController.addMember);

module.exports = router;
