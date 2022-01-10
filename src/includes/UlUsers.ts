import bcrypt from 'bcrypt'
import { Request } from "express"
import { Error400, RstError, TErr400 } from "../utils/UlError"
import { val2Bool, val2Number } from "../utils/UlParse"
import { getFields, verifyJSONBody } from "../utils/UlSequelizeUtils"
import { TJSONObject, TResponseData } from "../utils/UlTypes"
import User from "../models/User"
import { getResponse } from '../utils/UlResponse'

export const registerUser = async (req: Request): Promise<TResponseData> => {
   return new Promise<TResponseData>(async (resolve, reject) => {
      try {
         let JSON: TJSONObject = req.body

         // Obtener los campos a validar del JSON
         let fields: string[] = getFields(User.rawAttributes, ['id'])

         // Verificar las lleves del JSON
         verifyJSONBody(fields, JSON)

         // Verificar si ya existe un usuario con el email dado
         let bUserAlreadyExist: boolean = val2Bool(User.count({ where: { email: JSON["email"] } }))
         if (bUserAlreadyExist)
            return reject(RstError(Error400, TErr400.other, "El usuario con el email dado ya existe."))

         // Encriptar la contraseña
         JSON["password"] = await bcrypt.hash(JSON["password"], val2Number(process.env.SALT_ROUNDS))

         // Crear el nuevo usuario
         await User.create(JSON, { fields })

         resolve(getResponse(req, { bcreado: true }))
      } catch (error) {
         reject(error)
      }
   })
}