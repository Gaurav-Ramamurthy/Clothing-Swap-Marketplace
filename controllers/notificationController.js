const notificationModel = require("../models/notificationModel");

// Get Notifications
const getNotifications = async (req, res) => {

    try {

        const userId = req.user.id;

        const notifications = await notificationModel.getNotifications(userId);

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Mark One Notification as Read
const markAsRead = async (req, res) => {

    try {

        const userId = req.user.id;
        const notificationId = req.params.id;

        await notificationModel.markAsRead(notificationId, userId);

        res.status(200).json({
            success: true,
            message: "Notification marked as read."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Mark All Notifications as Read
const markAllAsRead = async (req, res) => {

    try {

        const userId = req.user.id;

        await notificationModel.markAllAsRead(userId);

        res.status(200).json({
            success: true,
            message: "All notifications marked as read."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Delete Notification
const deleteNotification = async (req, res) => {

    try {

        const userId = req.user.id;
        const notificationId = req.params.id;

        await notificationModel.deleteNotification(notificationId, userId);

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully."
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
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
};