import { Router } from "express";

import {login, forgotPassword, verifyCode, resetPassword} from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetPassword);

export default router;