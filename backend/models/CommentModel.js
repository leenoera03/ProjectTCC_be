import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Lukisan from "./LukisanModel.js";

const Comment = db.define("comment", {
    isi: { type: DataTypes.TEXT, allowNull: false }
}, {
    freezeTableName: true
});

Comment.belongsTo(Users, { foreignKey: "userId" });
Comment.belongsTo(Lukisan, { foreignKey: "lukisanId" });

export default Comment;