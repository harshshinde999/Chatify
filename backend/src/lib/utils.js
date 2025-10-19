import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET, NODE_ENV } = ENV;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: NODE_ENV === "production", // true for Render/Vercel
    sameSite: NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-domain
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
