import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Lukisan = db.define("lukisan", {
    judul: { type: DataTypes.STRING, allowNull: false },
    deskripsi: { type: DataTypes.TEXT },
    Seniman: { type: DataTypes.TEXT },
    tahun: { type: DataTypes.TEXT },
    gambar: { type: DataTypes.STRING }, 
}, {
    freezeTableName: true
});

export default Lukisan;
