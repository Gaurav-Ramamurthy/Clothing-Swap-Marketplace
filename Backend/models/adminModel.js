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
            is_active,,
            created_at
         FROM users
         WHERE is_active = TRUE
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

// Get User By ID
const getUserById = async (userId) => {

    const [rows] = await db.query(
        `SELECT
            id,
            full_name,
            email,
            role
         FROM users
         WHERE id = ?`,
        [userId]
    );

    return rows;
};


// Delete User
// Deactivate User (Soft Delete)
const deleteUser = async (userId) => {

    const [result] = await db.query(
        `UPDATE users
         SET is_active = FALSE
         WHERE id = ?`,
        [userId]
    );

    return result;
};

// Get All Clothing Items
const getAllItems = async () => {

    const [rows] = await db.query(
        `SELECT
            clothing_items.id,
            clothing_items.title,
            clothing_items.brand,
            clothing_items.size,
            clothing_items.condition_type,
            clothing_items.availability,
            users.full_name AS owner_name,
            categories.category_name
         FROM clothing_items
         
         INNER JOIN users
            ON clothing_items.user_id = users.id
         INNER JOIN categories
            ON clothing_items.category_id = categories.id
         WHERE clothing_items.is_active = TRUE
         ORDER BY clothing_items.created_at DESC`
    );

    return rows;
};


// Delete Clothing Item
// Soft Delete Clothing Item
const deleteItem = async (itemId) => {

    const [result] = await db.query(
        `UPDATE clothing_items
         SET is_active = FALSE
         WHERE id = ?`,
        [itemId]
    );

    return result;
};

// Get All Swap Requests
const getAllSwaps = async () => {

    const [rows] = await db.query(
        `SELECT
            swap_requests.id,
            swap_requests.status,
            swap_requests.created_at,

            requester.full_name AS requester_name,
            owner.full_name AS owner_name,

            requester_item.title AS offered_item,
            owner_item.title AS requested_item

        FROM swap_requests

        INNER JOIN users AS requester
            ON swap_requests.requester_id = requester.id

        INNER JOIN users AS owner
            ON swap_requests.owner_id = owner.id

        INNER JOIN clothing_items AS requester_item
            ON swap_requests.requester_item_id = requester_item.id

        INNER JOIN clothing_items AS owner_item
            ON swap_requests.owner_item_id = owner_item.id

        ORDER BY swap_requests.created_at DESC`
    );

    return rows;
};

// Block User
const blockUser = async (userId) => {

    const [result] = await db.query(
        `UPDATE users
         SET is_active = FALSE
         WHERE id = ?`,
        [userId]
    );

    return result;
};


// Unblock User
const unblockUser = async (userId) => {

    const [result] = await db.query(
        `UPDATE users
         SET is_active = TRUE
         WHERE id = ?`,
        [userId]
    );

    return result;
};


module.exports = {
    getAllUsers,
    getDashboardStats,
    deleteUser,
    getUserById,
    getAllItems,
    deleteItem,
    getAllSwaps,
    unblockUser,
    blockUser
};