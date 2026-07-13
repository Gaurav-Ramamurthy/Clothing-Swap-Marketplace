const db = require("../config/db");

// Check if item already exists in wishlist
const findWishlistItem = async (userId, itemId) => {

    const [rows] = await db.query(
        `SELECT *
         FROM wishlist
         WHERE user_id = ?
         AND clothing_item_id = ?`,
        [userId, itemId]
    );

    return rows;
};

// Add item to wishlist
const addWishlistItem = async (userId, itemId) => {

    const [result] = await db.query(
        `INSERT INTO wishlist
        (user_id, clothing_item_id)
        VALUES (?, ?)`,
        [userId, itemId]
    );

    return result;
};

// Get logged-in user's wishlist
const getWishlist = async (userId) => {

    const [rows] = await db.query(`
        SELECT
            wishlist.id,
            clothing_items.id AS item_id,
            clothing_items.title,
            clothing_items.description,
            clothing_items.size,
            clothing_items.color,
            clothing_items.brand,
            clothing_items.condition_type,
            clothing_items.availability,
            categories.category_name,
            users.full_name
        FROM wishlist
        INNER JOIN clothing_items
            ON wishlist.clothing_item_id = clothing_items.id
        INNER JOIN categories
            ON clothing_items.category_id = categories.id
        INNER JOIN users
            ON clothing_items.user_id = users.id
        WHERE wishlist.user_id = ?
        AND clothing_items.is_active = TRUE
        ORDER BY wishlist.created_at DESC
    `, [userId]);

    return rows;
};

// Remove item from wishlist
const removeWishlistItem = async (userId, itemId) => {

    const [result] = await db.query(
        `DELETE FROM wishlist
         WHERE user_id = ?
         AND clothing_item_id = ?`,
        [userId, itemId]
    );

    return result;
};

module.exports = {
    findWishlistItem,
    addWishlistItem,
    getWishlist,
    removeWishlistItem
};