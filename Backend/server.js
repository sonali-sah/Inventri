import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js";
import auth from "./middleware/auth.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", auth, itemRoutes);


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
