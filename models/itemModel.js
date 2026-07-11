const db = require("../config/db");

// Create a new clothing item
const createItem = async (item) => {

    const [result] = await db.query(
        `INSERT INTO clothing_items
        (
            user_id,
            category_id,
            title,
            description,
            size,
            color,
            brand,
            condition_type
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            item.user_id,
            item.category_id,
            item.title,
            item.description,
            item.size,
            item.color,
            item.brand,
            item.condition_type
        ]
    );

    return result;
};

// Get all clothing items
const getAllItems = async () => {

    const [rows] = await db.query(`
        SELECT
            clothing_items.id,
            clothing_items.title,
            clothing_items.description,
            clothing_items.size,
            clothing_items.color,
            clothing_items.brand,
            clothing_items.condition_type,
            clothing_items.availability,
            clothing_items.created_at,
            categories.category_name,
            users.full_name
        FROM clothing_items
        INNER JOIN categories
            ON clothing_items.category_id = categories.id
        INNER JOIN users
            ON clothing_items.user_id = users.id
        ORDER BY clothing_items.created_at DESC
    `);

    return rows;
};

module.exports = {
    createItem,
    getAllItems
};