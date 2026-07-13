const db = require("../config/db");

// Save image path in database
const addImage = async (clothing_item_id, image_url) => {

    const [result] = await db.query(
        `INSERT INTO clothing_images
        (clothing_item_id, image_url)
        VALUES (?, ?)`,
        [
            clothing_item_id,
            image_url
        ]
    );

    return result;
};

// Get all images for a clothing item
const getImagesByItemId = async (clothing_item_id) => {

    const [rows] = await db.query(
        `SELECT *
         FROM clothing_images
         WHERE clothing_item_id = ?`,
        [clothing_item_id]
    );

    return rows;
};

module.exports = {
    addImage,
    getImagesByItemId
};