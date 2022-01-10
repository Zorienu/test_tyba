import { Sequelize } from "sequelize"
import { val2Number, val2String } from "../utils/UlParse"

const {
   HOST_DB,
   PORT_DB,
   USER_DB,
   PASSWORD_DB,
   NAME_DB,
   HOST_DB_LOG,
   PORT_DB_LOG,
   USER_DB_LOG,
   PASSWORD_DB_LOG,
   NAME_DB_LOG
} = process.env

export const Conn: Sequelize = new Sequelize(
   val2String(NAME_DB),
   val2String(USER_DB),
   val2String(PASSWORD_DB),
   {
      host: HOST_DB,
      port: val2Number(PORT_DB),
      dialect: 'postgres',
      pool: {
         max: 5,
         min: 0,
         idle: 10000
      },
      logging: true
   }
)
