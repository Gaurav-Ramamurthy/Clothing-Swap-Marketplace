const express = require("express");

const router = express.Router();

const authenticateToken =
    require("../middleware/authMiddleware");

const messageController =
    require("../controllers/messageController");


// Send Message
router.post(
    "/",
    authenticateToken,
    messageController.sendMessage
);


// Get Messages
router.get(
    "/:swapId",
    authenticateToken,
    messageController.getMessages
);


// Mark Messages Read
router.put(
    "/:swapId/read",
    authenticateToken,
    messageController.markMessagesRead
);


// Get Conversations
router.get(
    "/conversations/all",
    authenticateToken,
    messageController.getConversations
);

module.exports = router;