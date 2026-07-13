const messageModel = require("../models/messageModel");
const swapModel = require("../models/swapModel");

// Send Message
const sendMessage = async (req, res) => {

    try {

        const senderId = req.user.id;

        const {
            receiver_id,
            swap_request_id,
            message
        } = req.body;

        if (!receiver_id || !swap_request_id || !message) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }

        // Check swap exists
        const swap = await swapModel.getSwapRequestById(
            swap_request_id
        );

        if (swap.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Swap request not found."
            });

        }

        // User must belong to swap
        const request = swap[0];

        if (
            senderId !== request.requester_id &&
            senderId !== request.owner_id
        ) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized."
            });

        }

        await messageModel.sendMessage(
            senderId,
            receiver_id,
            swap_request_id,
            message
        );

        res.status(201).json({
            success: true,
            message: "Message sent successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Get Messages
const getMessages = async (req, res) => {

    try {

        const swapId = req.params.swapId;

        const messages = await messageModel.getMessagesBySwap(
            swapId
        );

        res.status(200).json({
            success: true,
            count: messages.length,
            messages
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Mark Messages Read
const markMessagesRead = async (req, res) => {

    try {

        const swapId = req.params.swapId;

        const userId = req.user.id;

        await messageModel.markMessagesAsRead(
            swapId,
            userId
        );

        res.status(200).json({
            success: true,
            message: "Messages marked as read."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// Get Conversations
const getConversations = async (req, res) => {

    try {

        const userId = req.user.id;

        const conversations =
            await messageModel.getUserConversations(userId);

        res.status(200).json({
            success: true,
            count: conversations.length,
            conversations
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
    sendMessage,
    getMessages,
    markMessagesRead,
    getConversations
};