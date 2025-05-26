import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Lukisan = db.define("lukisan", {
    judul: { type: DataTypes.STRING, allowNull: false },
    deskripsi: { type: DataTypes.TEXT },
    seniman: { type: DataTypes.TEXT },
    tahun: { type: DataTypes.INTEGER }, 
    gambar: { type: DataTypes.STRING }, 
}, {
    freezeTableName: true
});

export default Lukisan;
