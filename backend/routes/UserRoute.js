import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/UserController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { adminOnly } from "../middleware/AdminOnly.js";
import { createLukisan, deleteLukisan } from "../controllers/LukisanController.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post("/lukisan", verifyToken, adminOnly, createLukisan);
router.delete('/logout', Logout);
router.delete("/lukisan/:id", verifyToken, adminOnly, deleteLukisan);

export default router;