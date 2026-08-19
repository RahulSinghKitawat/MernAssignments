const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [80, 'Title cannot exceed 80 characters'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      minlength: [10, 'Comment must be at least 10 characters'],
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value >= 1 && value <= 5;
        },
        message: 'Rating must be a whole number between 1 and 5',
      },
    },
    reviewerName: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true,
      minlength: [2, 'Reviewer name must be at least 2 characters'],
      maxlength: [50, 'Reviewer name cannot exceed 50 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: [0, 'Helpful count cannot be negative'],
    },
  },
  { timestamps: true }
);

reviewSchema.path('comment').validate(function (value) {
  return value.trim().length > 0;
}, 'Comment cannot be empty or only spaces');

module.exports = mongoose.model('review', reviewSchema);