// routes/authRoutes.js
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { authenticate, authorizeAdmin } = require('../middleware/auth')
const { validate } = require('../middleware/validation')
const { registerSchema, loginSchema } = require('../validations/userValidation')

// 🔹 Inscription publique
router.post('/register', validate(registerSchema), authController.register)

// 🔹 Connexion
router.post('/login', validate(loginSchema), authController.login)

// 🔹 Admin : créer un nouvel admin
router.post('/admin', authenticate, authorizeAdmin, validate(registerSchema), authController.addAdmin)

// 🔹 Admin : voir tous les utilisateurs
router.get('/', authenticate, authorizeAdmin, authController.getAllUsers)

// 🔹 Admin : supprimer un utilisateur
router.delete('/:id', authenticate, authorizeAdmin, authController.deleteUser)

// 🔹 Membre ou Admin : voir son profil
router.get('/me', authenticate, authController.getMyProfile)

// 🔹 Membre ou Admin : ajouter un membre
router.post('/members', authenticate, validate(registerSchema), authController.addMember)

module.exports = router
