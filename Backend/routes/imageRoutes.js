const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const imageController = require("../controllers/imageController");

// Upload up to 5 images for a clothing item
router.post(
    "/:id/images",
    authenticateToken,
    upload.array("images", 5),
    imageController.uploadImages
);

module.exports = router;