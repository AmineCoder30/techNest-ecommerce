// backend/middleware/multer.js
const multer = require("multer");
const path = require("path");

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Specify the filename
  },
});

const upload = multer({ storage: storage }).array("productImage");

module.exports = upload;
