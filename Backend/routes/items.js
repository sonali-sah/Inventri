import { Router } from "express";
import Item from "../models/Item.js";

const router = Router();

// Create
router.post("/", async (req, res) => {
  try {
    const { name, quantity = 0, category = "Other", price = null } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Name required" });
    const item = await Item.create({ user: req.userId, name, quantity, category, price });
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ message: "Create failed" });
  }
});

// Read (with sorting)
router.get("/", async (req, res) => {
  try {
    const { sortBy = "createdAt", order = "desc" } = req.query;
    const allowed = { name: "name", category: "category", quantity: "quantity", createdAt: "createdAt" };
    const sortField = allowed[sortBy] || "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    const items = await Item.find({ user: req.userId }).sort({ [sortField]: sortOrder });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

// Update (partial)
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ["name", "category", "price", "quantity"];
    const updates = {};
    for (const k of allowed) if (k in req.body) updates[k] = req.body[k];

    if ("quantity" in updates && updates.quantity < 0) updates.quantity = 0;

    const item = await Item.findOneAndUpdate(
      { _id: id, user: req.userId },
      { $set: updates },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Update failed" });
  }
});

// Update quantity (increment/decrement via delta)
router.patch("/:id/quantity", async (req, res) => {
  try {
    const { id } = req.params;
    const { delta = 0 } = req.body;
    const item = await Item.findOne({ _id: id, user: req.userId });
    if (!item) return res.status(404).json({ message: "Not found" });

    const nextQty = Math.max(0, (item.quantity || 0) + Number(delta || 0));
    item.quantity = nextQty;
    await item.save();
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Quantity update failed" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const { deletedCount } = await Item.deleteOne({ _id: req.params.id, user: req.userId });
    if (!deletedCount) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
