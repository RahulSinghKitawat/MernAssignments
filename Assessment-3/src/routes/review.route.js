const express = require('express');
const router = express.Router();
const { createReview, getReviews } = require('../controller/reviewController');
const validate = require('../middlewares/validationMiddleware');
const { createReviewSchema, getReviewSchema } = require('../validationSchema/reviewValidationSchema');

router.post('/createReview', validate(createReviewSchema), createReview);
router.get('/getReviews', validate(getReviewSchema, 'query'), getReviews);

module.exports = router;