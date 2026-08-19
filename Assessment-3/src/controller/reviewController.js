const reviewService = require('../service/reviewService');

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json({ success: true, message: 'Review created', data: review });
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const result = await reviewService.getReviews(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { createReview, getReviews };