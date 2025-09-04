// controllers/authController.js
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Joi = require('../validations/userValidation')
const User = require('../models/User')

// 📌 Inscription publique
exports.register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { name, email, password } = req.body

    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "Email déjà utilisé" })
    }

    const user = new User({ name, email, password, role: 'member' })
    await user.save()

    res.status(201).json({
      message: 'Inscription réussie, veuillez vous connecter',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 📌 Connexion
exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    // Générer le token JWT uniquement lors du login
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      message: 'Connexion réussie',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 📌 Ajouter un admin (admin seulement)
exports.addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (await User.findOne({ email })) {
      return res.status(409).json({ message: 'Email déjà utilisé' })
    }

    const admin = new User({ name, email, password, role: 'admin' })
    await admin.save()

    res.status(201).json({ message: 'Admin ajouté avec succès', admin })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 📌 Voir tous les utilisateurs (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 📌 Supprimer un utilisateur (admin)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Utilisateur supprimé avec succès' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 📌 Voir son profil
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 📌 Ajouter un membre lié à l'utilisateur
exports.addMember = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (await User.findOne({ email })) {
      return res.status(409).json({ message: 'Email déjà utilisé' })
    }

    const member = new User({ name, email, password, role: 'member' })
    await member.save()

    await User.findByIdAndUpdate(req.user.id, { $push: { members: member._id } })

    res.status(201).json({ message: 'Membre ajouté avec succès', member })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
