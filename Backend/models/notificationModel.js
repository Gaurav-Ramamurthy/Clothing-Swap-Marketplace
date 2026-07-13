const db = require("../config/db");

// Create Notification
const createNotification = async (userId, message) => {

    const [result] = await db.query(
        `INSERT INTO notifications
        (user_id, message)
        VALUES (?, ?)`,
        [userId, message]
    );

    return result;
};

// Get User Notifications
const getNotifications = async (userId) => {

    const [rows] = await db.query(
        `SELECT
            id,
            message,
            is_read,
            created_at
         FROM notifications
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return rows;
};

// Mark One Notification as Read
const markAsRead = async (notificationId, userId) => {

    const [result] = await db.query(
        `UPDATE notifications
         SET is_read = 1
         WHERE id = ?
         AND user_id = ?`,
        [notificationId, userId]
    );

    return result;
};

// Mark All Notifications as Read
const markAllAsRead = async (userId) => {

    const [result] = await db.query(
        `UPDATE notifications
         SET is_read = 1
         WHERE user_id = ?`,
        [userId]
    );

    return result;
};

// Delete Notification
const deleteNotification = async (notificationId, userId) => {

    const [result] = await db.query(
        `DELETE FROM notifications
         WHERE id = ?
         AND user_id = ?`,
        [notificationId, userId]
    );

    return result;
};

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
};