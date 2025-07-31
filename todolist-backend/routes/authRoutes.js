import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  sendResetPasswordEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getCurrentUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", sendResetPasswordEmail);

export default router;
