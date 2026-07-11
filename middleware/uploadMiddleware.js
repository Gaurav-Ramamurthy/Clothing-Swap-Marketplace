const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/clothing");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png/;

    const extension = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedTypes.test(file.mimetype);

    if (extension && mimeType) {

        return cb(null, true);

    }

    cb(new Error("Only JPG, JPEG and PNG images are allowed."));

};

// Upload Middleware
const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }

});

module.exports = upload;