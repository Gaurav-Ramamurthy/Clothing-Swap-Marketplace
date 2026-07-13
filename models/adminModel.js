const db = require("../config/db");

// Get All Users
const getAllUsers = async () => {

    const [rows] = await db.query(
        `SELECT
            id,
            full_name,
            email,
            phone,
            role,
            created_at
         FROM users
         ORDER BY created_at DESC`
    );

    return rows;
};


// Dashboard Statistics
const getDashboardStats = async () => {

    const [[users]] = await db.query(
        `SELECT COUNT(*) AS total_users
         FROM users`
    );

    const [[items]] = await db.query(
        `SELECT COUNT(*) AS total_items
         FROM clothing_items`
    );

    const [[swaps]] = await db.query(
        `SELECT COUNT(*) AS total_swaps
         FROM swap_requests`
    );

    const [[pending]] = await db.query(
        `SELECT COUNT(*) AS pending_swaps
         FROM swap_requests
         WHERE status = 'Pending'`
    );

    const [[accepted]] = await db.query(
        `SELECT COUNT(*) AS accepted_swaps
         FROM swap_requests
         WHERE status = 'Accepted'`
    );

    const [[rejected]] = await db.query(
        `SELECT COUNT(*) AS rejected_swaps
         FROM swap_requests
         WHERE status = 'Rejected'`
    );

    const [[reviews]] = await db.query(
        `SELECT COUNT(*) AS total_reviews
         FROM reviews`
    );

    const [[messages]] = await db.query(
        `SELECT COUNT(*) AS total_messages
         FROM messages`
    );

    return {
        total_users: users.total_users,
        total_items: items.total_items,
        total_swaps: swaps.total_swaps,
        pending_swaps: pending.pending_swaps,
        accepted_swaps: accepted.accepted_swaps,
        rejected_swaps: rejected.rejected_swaps,
        total_reviews: reviews.total_reviews,
        total_messages: messages.total_messages
    };

};

module.exports = {
    getAllUsers,
    getDashboardStats
};