import { DataTypes } from "sequelize";
import { Conn } from "../database/database";
import SearchHistory from "./SearchHistory";

const User = Conn.define('users', {
   id: { type: DataTypes.UUIDV4, primaryKey: true },
   email: { type: DataTypes.TEXT, primaryKey: true },
   name: { type: DataTypes.TEXT },
   password: { type: DataTypes.TEXT }
}, {
   timestamps: false
})

// Establecer relación uno a muchos
// Un usuario puede tener varias búsquedas relacionadas
User.hasMany(SearchHistory, { foreignKey: 'userid', sourceKey: 'id' })
SearchHistory.belongsTo(User, { foreignKey: 'userid' })

export default User