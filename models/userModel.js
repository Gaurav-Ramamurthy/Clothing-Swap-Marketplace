const db = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows;
};

// Find user by ID
const findUserById = async (id) => {
    const [rows] = await db.query(
        "SELECT id, full_name, email, phone, address, profile_image, created_at FROM users WHERE id = ?",
        [id]
    );

    return rows;
};

// Create a new user
const createUser = async (user) => {
    const [result] = await db.query(
        `INSERT INTO users
        (full_name, email, password, phone, address, profile_image)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            user.full_name,
            user.email,
            user.password,
            user.phone,
            user.address,
            user.profile_image
        ]
    );

    return result;
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser
};