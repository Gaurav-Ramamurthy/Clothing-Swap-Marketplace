const express = require("express");

const router = express.Router();

const authenticateToken =
    require("../middleware/authMiddleware");

const reviewController =
    require("../controllers/reviewController");


// Create Review
router.post(
    "/",
    authenticateToken,
    reviewController.createReview
);


// Get Reviews for User
router.get(
    "/user/:id",
    reviewController.getUserReviews
);


// Get Average Rating
router.get(
    "/user/:id/rating",
    reviewController.getAverageRating
);

module.exports = router;