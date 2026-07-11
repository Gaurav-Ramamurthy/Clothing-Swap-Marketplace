const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const itemController = require("../controllers/itemController");

// Get all clothing items (Public)
router.get("/", itemController.getAllItems);

// Add clothing item (Protected)
router.post(
    "/",
    authenticateToken,
    itemController.addItem
);

module.exports = router;