// validations/userValidation.js
const Joi = require('joi')

// 🔹 Schéma pour register / addAdmin / addMember
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Le nom est requis',
    'string.min': 'Le nom doit contenir au moins 2 caractères',
    'string.max': 'Le nom doit contenir au maximum 50 caractères',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': "L'email est requis",
    'string.email': "L'email doit être valide",
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Le mot de passe est requis',
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
  }),
})

// 🔹 Schéma pour login
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': "L'email est requis",
    'string.email': "L'email doit être valide",
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Le mot de passe est requis',
  }),
})

module.exports = {
  registerSchema,
  loginSchema,
}
