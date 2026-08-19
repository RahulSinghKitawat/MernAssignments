const express = require('express');
const router = express.Router();
const { createReview, getReviews, getSingleReview, updateReview, deleteReview } = require('../controller/reviewController');
const validate = require('../middlewares/validationMiddleware');
const { createReviewSchema, getReviewSchema, reviewIdSchema, updateReviewSchema } = require('../validationSchema/reviewValidationSchema');

router.post('/createReview', validate(createReviewSchema), createReview);
router.get('/getReviews', validate(getReviewSchema, 'query'), getReviews);
router.get('/getSingleReview/:id', validate(reviewIdSchema, 'params'), getSingleReview);
router.patch('/updateReview/:id', validate(reviewIdSchema, 'params'), validate(updateReviewSchema, 'body'), updateReview);
router.delete('/deleteReview/:id', validate(reviewIdSchema, 'params'), deleteReview);

module.exports = router;