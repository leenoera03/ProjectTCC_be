import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    no_hp: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "user" },
    refresh_token: { type: DataTypes.TEXT }
}, {
    freezeTableName: true
});

export default Users;