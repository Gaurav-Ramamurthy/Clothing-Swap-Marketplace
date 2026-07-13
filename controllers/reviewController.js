const reviewModel = require("../models/reviewModel");
const swapModel = require("../models/swapModel");

// Create Review
const createReview = async (req, res) => {

    try {

        const reviewerId = req.user.id;

        const {
            reviewed_user_id,
            swap_request_id,
            rating,
            review
        } = req.body;

        // Validate required fields
        if (
            !reviewed_user_id ||
            !swap_request_id ||
            !rating
        ) {

            return res.status(400).json({
                success: false,
                message: "All required fields must be provided."
            });

        }

        // Rating must be between 1 and 5
        if (rating < 1 || rating > 5) {

            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5."
            });

        }

        // Check swap exists
        const swap = await swapModel.getSwapRequestById(
            swap_request_id
        );

        if (swap.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Swap request not found."
            });

        }

        const request = swap[0];

        // Swap must be accepted
        if (request.status !== "Accepted") {

            return res.status(400).json({
                success: false,
                message: "Reviews are allowed only for accepted swaps."
            });

        }

        // Reviewer must belong to the swap
        if (
            reviewerId !== request.requester_id &&
            reviewerId !== request.owner_id
        ) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to review this swap."
            });

        }

        // Check duplicate review
        const existingReview =
            await reviewModel.checkExistingReview(
                reviewerId,
                swap_request_id
            );

        if (existingReview.length > 0) {

            return res.status(400).json({
                success: false,
                message: "You have already reviewed this swap."
            });

        }

        // Create review
        await reviewModel.createReview(
            reviewerId,
            reviewed_user_id,
            swap_request_id,
            rating,
            review
        );

        res.status(201).json({
            success: true,
            message: "Review submitted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Get Reviews for User
const getUserReviews = async (req, res) => {

    try {

        const userId = req.params.id;

        const reviews =
            await reviewModel.getUserReviews(userId);

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Get Average Rating
const getAverageRating = async (req, res) => {

    try {

        const userId = req.params.id;

        const rating =
            await reviewModel.getAverageRating(userId);

        res.status(200).json({
            success: true,
            rating: rating[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    createReview,
    getUserReviews,
    getAverageRating
};