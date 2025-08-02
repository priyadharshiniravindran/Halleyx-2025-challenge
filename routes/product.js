const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/product");

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /api/product/upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description, sizes } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed." });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const sizeArray = sizes.split(",");

    const newProduct = new Product({
      name,
      category,
      price,
      description,
      sizes: sizeArray,
      image: imagePath,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error while uploading product." });
  }
});

module.exports = router;
