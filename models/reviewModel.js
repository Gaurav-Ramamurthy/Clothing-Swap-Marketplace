const db = require("../config/db");

// Check if Review Already Exists
const checkExistingReview = async (
    reviewerId,
    swapRequestId
) => {

    const [rows] = await db.query(
        `SELECT id
         FROM reviews
         WHERE reviewer_id = ?
         AND swap_request_id = ?`,
        [
            reviewerId,
            swapRequestId
        ]
    );

    return rows;
};


// Create Review
const createReview = async (
    reviewerId,
    reviewedUserId,
    swapRequestId,
    rating,
    review
) => {

    const [result] = await db.query(
        `INSERT INTO reviews
        (
            reviewer_id,
            reviewed_user_id,
            swap_request_id,
            rating,
            review
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            reviewerId,
            reviewedUserId,
            swapRequestId,
            rating,
            review
        ]
    );

    return result;
};


// Get Reviews for a User
const getUserReviews = async (userId) => {

    const [rows] = await db.query(
        `SELECT
            reviews.id,
            reviews.rating,
            reviews.review,
            reviews.created_at,
            users.full_name AS reviewer_name
         FROM reviews
         INNER JOIN users
            ON reviews.reviewer_id = users.id
         WHERE reviews.reviewed_user_id = ?
         ORDER BY reviews.created_at DESC`,
        [userId]
    );

    return rows;
};


// Get Average Rating
const getAverageRating = async (userId) => {

    const [rows] = await db.query(
        `SELECT
            AVG(rating) AS average_rating,
            COUNT(*) AS total_reviews
         FROM reviews
         WHERE reviewed_user_id = ?`,
        [userId]
    );

    return rows;
};

module.exports = {
    checkExistingReview,
    createReview,
    getUserReviews,
    getAverageRating
};