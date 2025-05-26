export const adminOnly = (req, res, next) => {
    // Pastikan req.user sudah diisi oleh middleware VerifyToken
    if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Hanya admin yang boleh mengakses!" });
    }
    next();
};