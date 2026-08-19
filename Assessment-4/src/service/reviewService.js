const ReviewModel = require('../model/reviewModel');

const createReview = async (data) => {
  const { reviewerName, title } = data;
  const existing = await ReviewModel.findOne({ reviewerName, title });
  if (existing) {
    const err = new Error('You have already reviewed this product');
    err.statusCode = 400;
    throw err;
  }
  return await ReviewModel.create(data);
};

const getReviews = async (queryParams) => {
  const { status, minRating, page = 1, limit = 10 } = queryParams;
  const filter = {};
  if (status) filter.status = status;
  if (minRating) filter.rating = { $gte: minRating };
  const skip = (page - 1) * limit;
  const [reviews, total] = await Promise.all([
    ReviewModel.find(filter).skip(skip).limit(limit),
    ReviewModel.countDocuments(filter),
  ]);
  return { reviews, total, page, totalPages: Math.ceil(total / limit) };
};

const getSingleReview = async (id) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    const err = new Error('Review not found');
    err.statusCode = 404;
    throw err;
  }
  return review;
};

const updateReview = async (id, updateData) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    const err = new Error('Review not found');
    err.statusCode = 404;
    throw err;
  }
  Object.keys(updateData).forEach(key => {
    review[key] = updateData[key];
  });
  await review.save();
  return review;
};

const deleteReview = async (id) => {
  const review = await ReviewModel.findByIdAndDelete(id);
  if (!review) {
    const err = new Error('Review not found');
    err.statusCode = 404;
    throw err;
  }
  return review;
};

module.exports = { createReview, getReviews, getSingleReview, updateReview, deleteReview };