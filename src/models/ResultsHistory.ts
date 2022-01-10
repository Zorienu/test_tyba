import { DataTypes } from "sequelize";
import { Conn } from "../database/database";

const ResultHistory = Conn.define('results_history', {
   id: { type: DataTypes.INTEGER, primaryKey: true },
   searchid: { type: DataTypes.INTEGER },
   latitude: { type: DataTypes.REAL },
   longitude: { type: DataTypes.REAL },
   distance: { type: DataTypes.REAL },
   title: { type: DataTypes.TEXT },
   averagerating: { type: DataTypes.TEXT },
   category: { type: DataTypes.TEXT },
   address: { type: DataTypes.TEXT },
}, {
   timestamps: false,
   freezeTableName: true
})

export default ResultHistory