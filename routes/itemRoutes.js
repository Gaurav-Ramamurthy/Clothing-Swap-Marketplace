const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const itemController = require("../controllers/itemController");

// ============================
// Public Routes
// ============================

// Get all clothing items
router.get("/", itemController.getAllItems);

// Get single clothing item
router.get("/:id", itemController.getItemById);

// ============================
// Protected Routes
// ============================

// Add clothing item
router.post(
    "/",
    authenticateToken,
    itemController.addItem
);

// Update clothing item
router.put(
    "/:id",
    authenticateToken,
    itemController.updateItem
);

// Delete clothing item
router.delete(
    "/:id",
    authenticateToken,
    itemController.deleteItem
);

module.exports = router;