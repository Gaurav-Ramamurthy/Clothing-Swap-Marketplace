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

module.exports = router;