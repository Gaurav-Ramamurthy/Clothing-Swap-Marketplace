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

module.exports = {
    createItem
};