import Comment from "../models/CommentModel.js";

// Tambah komentar
export const tambahKomentar = async (req, res) => {
    try {
        console.log("BODY:", req.body); // Tambahkan ini
        const { isi, lukisanId } = req.body;
        await Comment.create({
            isi,
            lukisanId,
            userId: req.user.userId
        });
        res.status(201).json({ msg: "Komentar berhasil ditambah" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Edit komentar (hanya milik sendiri)
export const editKomentar = async (req, res) => {
    try {
        const komentar = await Comment.findOne({ where: { id: req.params.id, userId: req.user.userId } });
        if (!komentar) return res.status(404).json({ msg: "Komentar tidak ditemukan atau bukan milik Anda" });
        komentar.isi = req.body.isi;
        await komentar.save();
        res.json({ msg: "Komentar berhasil diedit" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Hapus komentar (hanya milik sendiri)
export const hapusKomentar = async (req, res) => {
    try {
        const deleted = await Comment.destroy({ where: { id: req.params.id, userId: req.user.userId } });
        if (!deleted) return res.status(404).json({ msg: "Komentar tidak ditemukan atau bukan milik Anda" });
        res.json({ msg: "Komentar berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};