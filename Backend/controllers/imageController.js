const imageModel = require("../models/imageModel");
const itemModel = require("../models/itemModel");

// Upload Images
const uploadImages = async (req, res) => {

    try {

        const { id } = req.params;

        // Check if item exists
        const owner = await itemModel.getItemOwner(id);

        if (owner.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            });
        }

        // Check ownership
        if (owner[0].user_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to upload images for this item."
            });
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one image."
            });
        }

        // Save image paths
        for (const file of req.files) {

            await imageModel.addImage(
                id,
                file.path.replace(/\\/g, "/")
            );

        }

        res.status(201).json({
            success: true,
            message: "Images uploaded successfully.",
            uploaded: req.files.length
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
    uploadImages
};