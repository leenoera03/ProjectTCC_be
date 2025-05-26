import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Lukisan = db.define("lukisan", {
    judul: { type: DataTypes.STRING, allowNull: false },
    deskripsi: { type: DataTypes.TEXT },
    gambar: { type: DataTypes.STRING }, // path atau url gambar
}, {
    freezeTableName: true
});

export default Lukisan;