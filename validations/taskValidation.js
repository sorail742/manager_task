const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('', null),
  priority: Joi.string().valid('low','medium','high').optional(),
  status: Joi.string().optional(),
  dueDate: Joi.date().optional()
});
