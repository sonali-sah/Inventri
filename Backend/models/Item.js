import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    category: { type: String, enum: ["Electronics", "Clothes", "Food", "Other"], default: "Other" },
    price: { type: Number, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
