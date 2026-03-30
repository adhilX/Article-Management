import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { refreshAccessToken } from "../controllers/refreshTokenController";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);

export default router;