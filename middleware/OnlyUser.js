export const onlyUser = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({ msg: "Hanya user yang boleh melakukan" });
    }
    next();
};