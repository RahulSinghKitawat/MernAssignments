const Joi = require('joi');
const mongoose = require('mongoose');

const createReviewSchema = Joi.object({
  title: Joi.string().trim().min(3).max(80).required(),
  comment: Joi.string().trim().min(10).max(500).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  reviewerName: Joi.string().trim().min(2).max(50).required(),
});

const getReviewSchema = Joi.object({
  status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
  minRating: Joi.number().min(1).max(5).optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(20).default(10),
});

const reviewIdSchema = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required()
    .messages({ 'any.invalid': 'Invalid ObjectId format' }),
});

const updateReviewSchema = Joi.object({
  title: Joi.string().trim().min(3).max(80),
  comment: Joi.string().trim().min(10).max(500),
  rating: Joi.number().integer().min(1).max(5),
  reviewerName: Joi.string().trim().min(2).max(50),
})
  .min(1)
  .message('At least one field must be provided for update');

module.exports = { createReviewSchema, getReviewSchema, reviewIdSchema, updateReviewSchema };