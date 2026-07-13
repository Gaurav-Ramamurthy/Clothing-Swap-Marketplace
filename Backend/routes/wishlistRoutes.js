const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const wishlistController = require("../controllers/wishlistController");

// Add item to wishlist
router.post(
    "/:itemId",
    authenticateToken,
    wishlistController.addToWishlist
);

// Get logged-in user's wishlist
router.get(
    "/",
    authenticateToken,
    wishlistController.getWishlist
);

// Remove item from wishlist
router.delete(
    "/:itemId",
    authenticateToken,
    wishlistController.removeWishlist
);

module.exports = router;