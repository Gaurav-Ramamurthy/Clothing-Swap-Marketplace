const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password,
            phone,
            address,
            profile_image
        } = req.body;

        // Check if email already exists
        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save User
        await userModel.createUser({
            full_name,
            email,
            password: hashedPassword,
            phone,
            address,
            profile_image
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Login User
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const users = await userModel.findUserByEmail(email);

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const user = users[0];

        // Check if account is active
        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Please contact the administrator."
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password."
            });
        }

        // Create JWT Token
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            role: user.role
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
    registerUser,
    loginUser
};