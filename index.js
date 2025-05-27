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

// CORS configuration dengan multiple origins
app.use(cors({
  credentials: true, 
  origin: [
    'https://d-04-450714.uc.r.appspot.com',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(cookieParser());
app.use(express.json());

// Health check endpoint (penting untuk Cloud Run)
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running', status: 'OK' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
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
      console.log("Admin user created");
    }
  })
  .catch((err) => console.error("Gagal sinkronisasi database:", err));

// Gunakan PORT dari environment variable (Cloud Run)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
