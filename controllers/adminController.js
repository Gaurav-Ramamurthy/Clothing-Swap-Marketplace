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

module.exports = {
    getAllUsers,
    getDashboard
};