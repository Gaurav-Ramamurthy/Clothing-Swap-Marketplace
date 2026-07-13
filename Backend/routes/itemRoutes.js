const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const itemController = require("../controllers/itemController");

// ============================
// Public Routes
// ============================

// Get all clothing items
router.get("/", (req, res) => {

    if (
        req.query.search ||
        req.query.brand ||
        req.query.size ||
        req.query.color ||
        req.query.category
    ) {

        return itemController.searchItems(req, res);

    }

    return itemController.getAllItems(req, res);

});

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