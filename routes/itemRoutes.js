const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const itemController = require("../controllers/itemController");

// Public Routes
router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);

// Protected Routes
router.post("/", authenticateToken, itemController.addItem);

router.put(
    "/:id",
    authenticateToken,
    itemController.updateItem
);

module.exports = router;