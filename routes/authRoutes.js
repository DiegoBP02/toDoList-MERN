import express from "express";
const router = express.Router();

import {
  login,
  register,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/logout").get(logoutUser);

export default router;
