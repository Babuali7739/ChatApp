// index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import massageRoutes from "./routes/massage.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
dotenv.config();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin (include port)
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/message", massageRoutes);

app.use(express.json({ limit: "10mb" })); // increase JSON size limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Server (HTTP + Socket.IO) is running on port ${PORT}`);
  connectDB();
});
