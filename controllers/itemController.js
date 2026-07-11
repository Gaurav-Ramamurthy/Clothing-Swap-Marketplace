const itemModel = require("../models/itemModel");

// Add Clothing Item
const addItem = async (req, res) => {

    try {

        const {
            category_id,
            title,
            description,
            size,
            color,
            brand,
            condition_type
        } = req.body;

        // Get logged-in user's ID from JWT
        const user_id = req.user.id;

        await itemModel.createItem({
            user_id,
            category_id,
            title,
            description,
            size,
            color,
            brand,
            condition_type
        });

        res.status(201).json({
            success: true,
            message: "Clothing item added successfully."
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

        const items = await itemModel.getAllItems();

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

module.exports = {
    addItem,
    getAllItems
};