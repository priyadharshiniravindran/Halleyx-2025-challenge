const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// ✅ POST: Add new orders
router.post("/add-orders", async (req, res) => {
  try {
    const { userId, orders } = req.body;

    // Validate input
    if (!userId || !orders || !Array.isArray(orders)) {
      return res.status(400).json({ message: "Invalid order format" });
    }

    // Enhance orders with metadata
    const enhancedOrders = orders.map(order => ({
      ...order,
      userId,
      date: new Date().toLocaleDateString(),
      payment: "Pending"
    }));

    const savedOrders = await Order.insertMany(enhancedOrders);

    res.status(201).json({
      message: "Orders placed successfully",
      orders: savedOrders
    });
  } catch (err) {
    console.error("❌ Error placing orders:", err);
    res.status(500).json({ message: "Server error placing orders" });
  }
});

// ✅ GET: Fetch orders by userId
router.get("/get-orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ userId }).sort({ date: -1 });

    res.status(200).json({ orders });
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ message: "Server error fetching orders" });
  }
});

module.exports = router;
