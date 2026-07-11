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

// Get Single Clothing Item
const getItemById = async (req, res) => {

    try {

        const { id } = req.params;

        const items = await itemModel.getItemById(id);

        if (items.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            });
        }

        res.status(200).json({
            success: true,
            item: items[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Update Clothing Item
const updateItem = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            category_id,
            title,
            description,
            size,
            color,
            brand,
            condition_type
        } = req.body;

        // Find item owner
        const owner = await itemModel.getItemOwner(id);

        if (owner.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            });
        }

        // Check authorization
        if (owner[0].user_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this item."
            });
        }

        // Update item
        await itemModel.updateItem(id, {
            category_id,
            title,
            description,
            size,
            color,
            brand,
            condition_type
        });

        res.status(200).json({
            success: true,
            message: "Item updated successfully."
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
    getAllItems,
    getItemById,
    updateItem
};


