const wishlistModel = require("../models/wishlistModel");
const itemModel = require("../models/itemModel");

// Add Item to Wishlist
const addToWishlist = async (req, res) => {

    try {

        const userId = req.user.id;
        const itemId = req.params.itemId;

        // Check if item exists
        const item = await itemModel.getItemById(itemId);

        if (item.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            });
        }

        // Check if already in wishlist
        const existing = await wishlistModel.findWishlistItem(userId, itemId);

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Item already exists in wishlist."
            });
        }

        // Add to wishlist
        await wishlistModel.addWishlistItem(userId, itemId);

        res.status(201).json({
            success: true,
            message: "Item added to wishlist."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// View Wishlist
const getWishlist = async (req, res) => {

    try {

        const userId = req.user.id;

        const wishlist = await wishlistModel.getWishlist(userId);

        res.status(200).json({
            success: true,
            count: wishlist.length,
            wishlist
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Remove Item from Wishlist
const removeWishlist = async (req, res) => {

    try {

        const userId = req.user.id;
        const itemId = req.params.itemId;

        await wishlistModel.removeWishlistItem(userId, itemId);

        res.status(200).json({
            success: true,
            message: "Item removed from wishlist."
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
    addToWishlist,
    getWishlist,
    removeWishlist
};