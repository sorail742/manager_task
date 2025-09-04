// controllers/authController.js
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { registerSchema, loginSchema, registerUserSchema } = require('../validations/userValidation')
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
// controllers/authController.js
exports.addMemberOrAdmin = async (req, res) => {
  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, role } = req.body;

    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email déjà utilisé' });

    // Si c'est pour créer un admin, vérifier que c'est un admin qui fait la requête
    if (role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Seul un admin peut créer un admin" });
    }

    // Par défaut, si pas de role ou rôle invalide pour un membre, mettre 'member'
    const userRole = role === 'admin' ? 'admin' : 'member';

    const newUser = new User({ name, email, password, role: userRole });
    await newUser.save();

    // Lier le membre au créateur uniquement si c'est un membre
    if (userRole === 'member') {
      await User.findByIdAndUpdate(req.user.id, { $push: { members: newUser._id } });
    }

    res.status(201).json({ message: 'Utilisateur ajouté avec succès', newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


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


