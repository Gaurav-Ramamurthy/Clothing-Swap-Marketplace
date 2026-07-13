const swapModel = require("../models/swapModel");
const notificationModel = require("../models/notificationModel");

// Create Swap Request
const createSwapRequest = async (req, res) => {

    try {

        const requesterId = req.user.id;

        const {
            requester_item_id,
            owner_item_id
        } = req.body;

        // Get both items
        const requesterItem = await swapModel.getItem(requester_item_id);
        const ownerItem = await swapModel.getItem(owner_item_id);

        // Check if items exist
        if (requesterItem.length === 0 || ownerItem.length === 0) {

            return res.status(404).json({
                success: false,
                message: "One or both items not found."
            });

        }

        // Check requester owns offered item
        if (requesterItem[0].user_id !== requesterId) {

            return res.status(403).json({
                success: false,
                message: "You do not own the item you are offering."
            });

        }

        // Cannot request own item
        if (ownerItem[0].user_id === requesterId) {

            return res.status(400).json({
                success: false,
                message: "You cannot request your own item."
            });

        }

        // Check availability
        if (
            requesterItem[0].availability !== "Available" ||
            ownerItem[0].availability !== "Available"
        ) {

            return res.status(400).json({
                success: false,
                message: "One or both items are unavailable."
            });

        }

        // Duplicate request check
        const existing = await swapModel.findPendingRequest(
            requester_item_id,
            owner_item_id
        );

        if (existing.length > 0) {

            return res.status(400).json({
                success: false,
                message: "A pending swap request already exists."
            });

        }

        // Create swap request
        await swapModel.createSwapRequest(
            requesterId,
            ownerItem[0].user_id,
            requester_item_id,
            owner_item_id
        );
        await notificationModel.createNotification(
            ownerItem[0].user_id,
            "You have received a new swap request."
        );

        res.status(201).json({
            success: true,
            message: "Swap request created successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};



// View Sent Swap Requests
const getSentRequests = async (req, res) => {

    try {

        const userId = req.user.id;

        const requests = await swapModel.getSentRequests(userId);

        res.status(200).json({
            success: true,
            count: requests.length,
            requests
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// View Received Swap Requests
const getReceivedRequests = async (req, res) => {

    try {

        const userId = req.user.id;

        const requests = await swapModel.getReceivedRequests(userId);

        res.status(200).json({
            success: true,
            count: requests.length,
            requests
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Accept Swap Request
const acceptSwapRequest = async (req, res) => {

    try {

        const userId = req.user.id;
        const swapId = req.params.id;

        // Get swap request
        const swap = await swapModel.getSwapRequestById(swapId);

        if (swap.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Swap request not found."
            });

        }

        const request = swap[0];

        // Only owner can accept
        if (request.owner_id !== userId) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to accept this swap request."
            });

        }

        // Only pending requests can be accepted
        if (request.status !== "Pending") {

            return res.status(400).json({
                success: false,
                message: "This swap request has already been processed."
            });

        }

        // Accept swap (transaction)
        await swapModel.acceptSwapRequest(
            swapId,
            request.requester_item_id,
            request.owner_item_id
        );
        await swapModel.acceptSwapRequest(
            swapId,
            request.requester_item_id,
            request.owner_item_id
        );

        res.status(200).json({
            success: true,
            message: "Swap request accepted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Reject Swap Request
const rejectSwapRequest = async (req, res) => {

    try {

        const userId = req.user.id;
        const swapId = req.params.id;

        // Get swap request
        const swap = await swapModel.getSwapRequestById(swapId);

        if (swap.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Swap request not found."
            });
        }

        const request = swap[0];

        // Only owner can reject
        if (request.owner_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to reject this swap request."
            });
        }

        // Only pending requests can be rejected
        if (request.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "This swap request has already been processed."
            });
        }

        // Reject request
        await swapModel.rejectSwapRequest(swapId);

        res.status(200).json({
            success: true,
            message: "Swap request rejected successfully."
        });
        await notificationModel.createNotification(
            request.requester_id,
            "Your swap request has been rejected."
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    createSwapRequest,
    getSentRequests,
    getReceivedRequests,
    acceptSwapRequest,
    rejectSwapRequest
};