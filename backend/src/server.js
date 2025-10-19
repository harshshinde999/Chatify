import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import groupRoutes from "./routes/group.route.js";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// Parse JSON bodies
app.use(express.json({ limit: "5mb" }));

// Enable CORS only for your frontend
app.use(cors({
  origin: ENV.CLIENT_URL,   // Only your deployed frontend URL
  credentials: true         // Allow cookies
}));

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupRoutes);

// Serve frontend in production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
