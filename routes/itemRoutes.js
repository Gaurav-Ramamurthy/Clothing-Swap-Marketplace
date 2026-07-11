const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const itemController = require("../controllers/itemController");

// Add Clothing Item
router.post("/", authenticateToken, itemController.addItem);

module.exports = router;