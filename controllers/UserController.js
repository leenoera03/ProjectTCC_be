import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','username','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

// Register a new user
export const Register = async (req, res) => {
    const { username, email, no_hp, password, confPassword } = req.body;

    // Validasi input
    if (!username || !email || !password || !confPassword) {
        return res.status(400).json({ msg: "Semua field harus diisi" });
    }

    // Validasi password dan konfirmasi password
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        // Buat user baru
        await Users.create({
            username: username,
            email: email,
            no_hp: no_hp, 
            password: hashPassword,
            role: "user" // Default role sebagai user
        });

        res.json({ msg: "Register Berhasil" });
    } catch (error) {
        console.error("Error saat register:", error);
        res.status(500).json({ msg: "Register Gagal" });
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ msg: "Password salah" });

        // Buat token JWT dengan role
        const accessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role // <-- role masuk ke token!
            },
            "SECRET_KEY", // ganti dengan process.env.JWT_SECRET jika pakai .env
            { expiresIn: "1d" }
        );

        res.status(200).json({
            msg: "Login berhasil",
            role: user.role,
            accessToken
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}