import express from "express";
import { tambahKomentar, editKomentar, hapusKomentar } from "../controllers/CommentController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { onlyUser } from "../middleware/OnlyUser.js";
import Comment from "../models/CommentModel.js"; // Pastikan untuk mengimpor model Comment

const router = express.Router();

router.post("/komentar", verifyToken, onlyUser, tambahKomentar);
router.put("/komentar/:id", verifyToken, onlyUser, editKomentar);
router.delete("/komentar/:id", verifyToken, onlyUser, hapusKomentar);
router.get("/komentar", async (req, res) => {
  const { lukisanId } = req.query;

  if (!lukisanId) {
    return res.status(400).json({ msg: "Parameter lukisanId diperlukan" });
  }

  try {
    const data = await Comment.findAll({ where: { lukisanId } });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
});


export default router;