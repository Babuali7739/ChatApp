import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage(); // store in memory
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put(
  "/update-profile",
  protectedRoute,
  upload.single("profilePic"),
  updateProfile
);

router.get("/check", protectedRoute, checkAuth);
export default router;
