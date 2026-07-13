const db = require("../config/db");

// Get active clothing item
const getItem = async (itemId) => {

    const [rows] = await db.query(
        `SELECT *
         FROM clothing_items
         WHERE id = ?
         AND is_active = TRUE`,
        [itemId]
    );

    return rows;
};
// Check for duplicate pending request
const findPendingRequest = async (requesterItemId, ownerItemId) => {

    const [rows] = await db.query(
        `SELECT *
         FROM swap_requests
         WHERE requester_item_id = ?
         AND owner_item_id = ?
         AND status = 'Pending'`,
        [requesterItemId, ownerItemId]
    );

    return rows;
};

// Create swap request
const createSwapRequest = async (
    requesterId,
    ownerId,
    requesterItemId,
    ownerItemId
) => {

    const [result] = await db.query(
        `INSERT INTO swap_requests
        (
            requester_id,
            owner_id,
            requester_item_id,
            owner_item_id
        )
        VALUES (?, ?, ?, ?)`,
        [
            requesterId,
            ownerId,
            requesterItemId,
            ownerItemId
        ]
    );

    return result;
};

// Get Sent Swap Requests
const getSentRequests = async (userId) => {

    const [rows] = await db.query(`
        SELECT
            swap_requests.id,
            swap_requests.status,
            swap_requests.created_at,

            requester_items.title AS offered_item,
            owner_items.title AS requested_item,

            users.full_name AS owner_name

        FROM swap_requests

        INNER JOIN clothing_items AS requester_items
            ON swap_requests.requester_item_id = requester_items.id

        INNER JOIN clothing_items AS owner_items
            ON swap_requests.owner_item_id = owner_items.id

        INNER JOIN users
            ON swap_requests.owner_id = users.id

        WHERE swap_requests.requester_id = ?

        ORDER BY swap_requests.created_at DESC
    `, [userId]);

    return rows;
};

// Get Received Swap Requests
const getReceivedRequests = async (userId) => {

    const [rows] = await db.query(`
        SELECT
            swap_requests.id,
            swap_requests.status,
            swap_requests.created_at,

            requester_items.title AS offered_item,
            owner_items.title AS requested_item,

            users.full_name AS requester_name

        FROM swap_requests

        INNER JOIN clothing_items AS requester_items
            ON swap_requests.requester_item_id = requester_items.id

        INNER JOIN clothing_items AS owner_items
            ON swap_requests.owner_item_id = owner_items.id

        INNER JOIN users
            ON swap_requests.requester_id = users.id

        WHERE swap_requests.owner_id = ?

        ORDER BY swap_requests.created_at DESC
    `, [userId]);

    return rows;
};

// Get Swap Request by ID
const getSwapRequestById = async (swapId) => {

    const [rows] = await db.query(
        `SELECT *
         FROM swap_requests
         WHERE id = ?`,
        [swapId]
    );

    return rows;
};


// Accept Swap (Transaction)
const acceptSwapRequest = async (swapId, requesterItemId, ownerItemId) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        // Update swap request
        await connection.query(
            `UPDATE swap_requests
             SET status = 'Accepted'
             WHERE id = ?`,
            [swapId]
        );

        // Update requester item
        await connection.query(
            `UPDATE clothing_items
             SET availability = 'Swapped'
             WHERE id = ?`,
            [requesterItemId]
        );

        // Update owner item
        await connection.query(
            `UPDATE clothing_items
             SET availability = 'Swapped'
             WHERE id = ?`,
            [ownerItemId]
        );

        await connection.commit();

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();

    }

};

// Reject Swap Request
const rejectSwapRequest = async (swapId) => {

    const [result] = await db.query(
        `UPDATE swap_requests
         SET status = 'Rejected'
         WHERE id = ?`,
        [swapId]
    );

    return result;
};

module.exports = {
    getItem,
    findPendingRequest,
    createSwapRequest,
    getSentRequests,
    getReceivedRequests,
    getSwapRequestById,
    acceptSwapRequest,
    rejectSwapRequest
};