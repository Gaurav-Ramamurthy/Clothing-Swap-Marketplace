const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const notificationController = require("../controllers/notificationController");

// Get Notifications
router.get(
    "/",
    authenticateToken,
    notificationController.getNotifications
);

// Mark One Notification as Read
router.put(
    "/:id/read",
    authenticateToken,
    notificationController.markAsRead
);

// Mark All Notifications as Read
router.put(
    "/read-all",
    authenticateToken,
    notificationController.markAllAsRead
);

// Delete Notification
router.delete(
    "/:id",
    authenticateToken,
    notificationController.deleteNotification
);

module.exports = router;