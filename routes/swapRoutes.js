const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const swapController = require("../controllers/swapController");

// Create Swap Request
router.post(
    "/",
    authenticateToken,
    swapController.createSwapRequest
);

// View Sent Requests
router.get(
    "/sent",
    authenticateToken,
    swapController.getSentRequests
);

// View Received Requests
router.get(
    "/received",
    authenticateToken,
    swapController.getReceivedRequests
);

// Accept Swap Request
router.put(
    "/:id/accept",
    authenticateToken,
    swapController.acceptSwapRequest
);

// Reject Swap Request
router.put(
    "/:id/reject",
    authenticateToken,
    swapController.rejectSwapRequest
);

module.exports = router;