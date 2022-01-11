import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request } from "express"
import { TJSONObject, TResponseData } from "../utils/UlTypes"
import { verifyJSONBody } from '../utils/UlSequelizeUtils'
import User from '../models/User'
import { Error401, RstError, TErr401 } from '../utils/UlError'
import { val2Number, val2String } from '../utils/UlParse'
import { getResponse } from '../utils/UlResponse'

export const loginUser = (req: Request): Promise<TResponseData> => {
   return new Promise<TResponseData>(async (resolve, reject) => {
      try {
         let JSON: TJSONObject = req.body

         // Se verifica que se haya entregado el 'email' y el 'password' en el body de la petición
         verifyJSONBody(['email', 'password'], JSON)

         const { email, password } = JSON

         // Buscar usuario con el email dado
         let userDB = await User.findOne({ where: { email } })
         // Si no se encuentra el usuario o si la contraseña es incorrecta se entrega un error
         let bCorrectPassword: boolean = !userDB ?
            false :
            await bcrypt.compare(password, userDB.getDataValue("password"))

         // Si la contraseña es incorrecta se entrega un error
         if (!(userDB && bCorrectPassword))
            return reject(RstError(Error401, TErr401.credentials))

         // Obtener información a enviar en el token
         let user: TJSONObject = userDB.toJSON()
         let jToken: TJSONObject = {
            id: user.id,
            email: user.email
         }

         // Se obtiene el token 
         let maxAge: number = val2Number(process.env.TOKEN_MAX_AGE)
         let token: string = jwt.sign(jToken, val2String(process.env.JWT_SECRET), { expiresIn: maxAge })

         resolve(getResponse(req, { name: user.name, email: user.email, token }))
      } catch (error) {
         reject(error)
      }
   })
}
