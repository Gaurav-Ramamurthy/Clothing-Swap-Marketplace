const adminModel = require("../models/adminModel");

// Get All Users
const getAllUsers = async (req, res) => {

    try {

        const users = await adminModel.getAllUsers();

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Dashboard Statistics
const getDashboard = async (req, res) => {

    try {

        const stats = await adminModel.getDashboardStats();

        res.status(200).json({
            success: true,
            dashboard: stats
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Delete User
const deleteUser = async (req, res) => {

    try {

        const userId = req.params.id;

        // Check if user exists
        const user = await adminModel.getUserById(userId);

        if (user.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found."
            });

        }

        // Prevent deleting yourself
        if (req.user.id == userId) {

            return res.status(400).json({
                success: false,
                message: "You cannot delete your own admin account."
            });

        }

        await adminModel.deleteUser(userId);

        res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get All Clothing Items
const getAllItems = async (req, res) => {

    try {

        const items = await adminModel.getAllItems();

        res.status(200).json({
            success: true,
            count: items.length,
            items
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Delete Clothing Item
const deleteItem = async (req, res) => {

    try {

        const itemId = req.params.id;

        await adminModel.deleteItem(itemId);

        res.status(200).json({
            success: true,
            message: "Item deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get All Swap Requests
const getAllSwaps = async (req, res) => {

    try {

        const swaps = await adminModel.getAllSwaps();

        res.status(200).json({
            success: true,
            count: swaps.length,
            swaps
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get All Reviews
const getAllReviews = async (req, res) => {

    try {

        const reviewModel = require("../models/reviewModel");

        const reviews = await reviewModel.getAllReviews();

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Soft Delete Review
const deleteReview = async (req, res) => {

    try {

        const reviewModel = require("../models/reviewModel");

        const { id } = req.params;

        await reviewModel.deleteReview(id);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Block User
const blockUser = async (req, res) => {

    try {

        const userId = req.params.id;

        const user = await adminModel.getUserById(userId);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (req.user.id == userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot block your own account."
            });
        }

        await adminModel.blockUser(userId);

        res.status(200).json({
            success: true,
            message: "User blocked successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Unblock User
const unblockUser = async (req, res) => {

    try {

        const userId = req.params.id;

        const user = await adminModel.getUserById(userId);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        await adminModel.unblockUser(userId);

        res.status(200).json({
            success: true,
            message: "User unblocked successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


module.exports = {
    getAllUsers,
    getDashboard,
    deleteUser,
    deleteItem,
    getAllItems,
    getAllSwaps,
    getAllReviews,
    deleteReview,
    blockUser,
    unblockUser
};