const ReviewModel = require('../model/reviewModel');
const { conflict, notFound } = require('../utils/apiError');

const createReview = async (data) => {
  const { reviewerName, title } = data;
  const existing = await ReviewModel.findOne({ reviewerName, title });
  if (existing) throw conflict('You have already reviewed this product');
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
  if (!review) throw notFound('Review not found');
  return review;
};

const updateReview = async (id, updateData) => {
  const review = await ReviewModel.findById(id);
  if (!review) throw notFound('Review not found');
  Object.keys(updateData).forEach(key => {
    review[key] = updateData[key];
  });
  await review.save();
  return review;
};

const deleteReview = async (id) => {
  const review = await ReviewModel.findByIdAndDelete(id);
  if (!review) throw notFound('Review not found');
  return review;
};

module.exports = { createReview, getReviews, getSingleReview, updateReview, deleteReview };