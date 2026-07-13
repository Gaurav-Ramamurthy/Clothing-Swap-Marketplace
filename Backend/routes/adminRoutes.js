const express = require("express");

const router = express.Router();

const authenticateToken =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const adminController =
    require("../controllers/adminController");


// Get All Users
router.get(
    "/users",
    authenticateToken,
    adminMiddleware,
    adminController.getAllUsers
);


// Dashboard
router.get(
    "/dashboard",
    authenticateToken,
    adminMiddleware,
    adminController.getDashboard
);

// Delete User
router.delete(
    "/users/:id",
    authenticateToken,
    adminMiddleware,
    adminController.deleteUser
);

// View All Clothing Items
router.get(
    "/items",
    authenticateToken,
    adminMiddleware,
    adminController.getAllItems
);


// Delete Clothing Item
router.delete(
    "/items/:id",
    authenticateToken,
    adminMiddleware,
    adminController.deleteItem
);

// View All Swap Requests
router.get(
    "/swaps",
    authenticateToken,
    adminMiddleware,
    adminController.getAllSwaps
); 

// View All Reviews
router.get(
    "/reviews",
    authenticateToken,
    adminMiddleware,
    adminController.getAllReviews
);


// Soft Delete Review
router.delete(
    "/reviews/:id",
    authenticateToken,
    adminMiddleware,
    adminController.deleteReview
);

// Block User
router.put(
    "/users/:id/block",
    authenticateToken,
    adminMiddleware,
    adminController.blockUser
);


// Unblock User
router.put(
    "/users/:id/unblock",
    authenticateToken,
    adminMiddleware,
    adminController.unblockUser
);



module.exports = router;