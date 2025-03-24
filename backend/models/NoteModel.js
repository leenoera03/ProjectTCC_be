import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "user"
const Note = db.define(
  "notes", // Nama Tabel
  {
    nama: Sequelize.STRING,
    catatan : Sequelize.STRING
  }
);

db.sync().then(() => console.log("Database synced"));

export default Note;
