const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review.controller');


router.post('/review', reviewController.createReview);

router.get('/review/:productId', reviewController.getReviews);

router.put('/review/:id', reviewController.updateReview);

router.delete('/review/:id', reviewController.deleteReview);

module.exports = router;
