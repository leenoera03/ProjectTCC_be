import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import Users from "./models/UserModel.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import LukisanRoute from "./routes/LukisanRoute.js";
import CommentRoute from "./routes/CommentRoute.js";

dotenv.config();
const app = express();

app.use(cors({credentials: true, origin: 'https://d-04-450714.uc.r.appspot.com'}));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);
app.use(LukisanRoute);
app.use(CommentRoute);

// Sinkronisasi database
db.sync()
  .then(async () => {
    console.log("Database & tabel sudah sinkron!");

    // Cek apakah admin sudah ada
    const admin = await Users.findOne({ where: { email: "admin@pameran.com" } });
    if (!admin) {
      const hashPassword = await bcrypt.hash("123", 10);
      await Users.create({
        email: "admin@pameran.com",
        password: hashPassword,
        role: "admin"
      });
    }
  })
  .catch((err) => console.error("Gagal sinkronisasi database:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
