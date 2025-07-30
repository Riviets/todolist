import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getCurrentUser);

export default router;
