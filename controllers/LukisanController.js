import Lukisan from "../models/LukisanModel.js";

// Ambil semua lukisan
export const getAllLukisan = async (req, res) => {
    try {
        const lukisan = await Lukisan.findAll();
        res.json(lukisan);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Tambah lukisan (admin only)
export const createLukisan = async (req, res) => {
    try {
        const { judul, deskripsi, gambar } = req.body;
        
        if (!judul || judul.trim() === "") {
          return res.status(400).json({ msg: "Judul wajib diisi" });
        }
        
        await Lukisan.create({ judul, deskripsi, gambar });
        res.status(201).json({ msg: "Lukisan berhasil ditambah" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


// Hapus lukisan (admin only)
export const deleteLukisan = async (req, res) => {
    try {
        const deleted = await Lukisan.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ msg: "Lukisan tidak ditemukan" });
        res.json({ msg: "Lukisan berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Update lukisan (admin only)
export const updateLukisan = async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, gambar } = req.body;
  try {
    await Lukisan.update(
      { judul, deskripsi, gambar },
      { where: { id } }
    );
    res.json({ msg: "Lukisan berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

