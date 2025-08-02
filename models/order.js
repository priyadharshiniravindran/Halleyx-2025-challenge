const express = require("express");
const Order = require("../models/order");

const router = express.Router();

router.post("/", async (req, res) => {
  const { customerId, items, total } = req.body;
  try {
    const order = new Order({ customerId, items, total });
    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;
