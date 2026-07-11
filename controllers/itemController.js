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

        // Save item
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

module.exports = {
    addItem
};