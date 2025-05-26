import express from "express";
import { getAllLukisan, createLukisan, deleteLukisan, updateLukisan} from "../controllers/LukisanController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { adminOnly } from "../middleware/AdminOnly.js";

const router = express.Router();

router.get("/lukisan", verifyToken, getAllLukisan); // semua user login bisa lihat
router.post("/lukisan", verifyToken, adminOnly, createLukisan); // hanya admin
router.put('/lukisan/:id', verifyToken, adminOnly, updateLukisan); // hanya admin
router.delete("/lukisan/:id", verifyToken, adminOnly, deleteLukisan); // hanya admin

export default router;