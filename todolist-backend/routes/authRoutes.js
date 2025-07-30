import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", registerUser);
router.post("/login", loginUser);

export default router;
