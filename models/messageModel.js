const db = require("../config/db");

// Send Message
const sendMessage = async (
    senderId,
    receiverId,
    swapRequestId,
    message
) => {

    const [result] = await db.query(
        `INSERT INTO messages
        (
            sender_id,
            receiver_id,
            swap_request_id,
            message
        )
        VALUES (?, ?, ?, ?)`,
        [
            senderId,
            receiverId,
            swapRequestId,
            message
        ]
    );

    return result;
};

// Get Messages for a Swap Request
const getMessagesBySwap = async (swapRequestId) => {

    const [rows] = await db.query(
        `SELECT
            messages.id,
            messages.sender_id,
            users.full_name,
            messages.message,
            messages.is_read,
            messages.created_at
        FROM messages
        INNER JOIN users
            ON messages.sender_id = users.id
        WHERE messages.swap_request_id = ?
        ORDER BY messages.created_at ASC`,
        [swapRequestId]
    );

    return rows;
};

// Mark Messages as Read
const markMessagesAsRead = async (
    swapRequestId,
    userId
) => {

    const [result] = await db.query(
        `UPDATE messages
         SET is_read = 1
         WHERE swap_request_id = ?
         AND receiver_id = ?`,
        [
            swapRequestId,
            userId
        ]
    );

    return result;
};

// Get User Conversations
const getUserConversations = async (userId) => {

    const [rows] = await db.query(
        `SELECT DISTINCT
            swap_request_id
         FROM messages
         WHERE sender_id = ?
            OR receiver_id = ?
         ORDER BY swap_request_id DESC`,
        [
            userId,
            userId
        ]
    );

    return rows;
};

module.exports = {
    sendMessage,
    getMessagesBySwap,
    markMessagesAsRead,
    getUserConversations
};