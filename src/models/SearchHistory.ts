import { DataTypes } from "sequelize";
import { Conn } from "../database/database";
import ResultHistory from "./ResultsHistory";

const SearchHistory = Conn.define('search_history', {
   id: { type: DataTypes.INTEGER, primaryKey: true },
   userid: { type: DataTypes.UUIDV4 },
   latitude: { type: DataTypes.REAL },
   longitude: { type: DataTypes.REAL },
   countrycode: { type: DataTypes.TEXT },
   country: { type: DataTypes.TEXT },
   city: { type: DataTypes.TEXT },
   jaddress: { type: DataTypes.TEXT },
   searchdate: { type: DataTypes.DATE }
}, {
   timestamps: false,
   freezeTableName: true
})

// Establecer relación uno a muchos
// Un usuario puede tener varias búsquedas relacionadas
SearchHistory.hasMany(ResultHistory, { foreignKey: 'searchid', sourceKey: 'id' })
ResultHistory.belongsTo(SearchHistory, { foreignKey: 'searchid' })

export default SearchHistory