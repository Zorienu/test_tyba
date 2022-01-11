import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import { JsonWebTokenError } from "jsonwebtoken"
import { Error401, RstError, TErr401 } from "../utils/UlError"
import { val2Bool, val2String } from "../utils/UlParse"
import { TJSONObject } from "../utils/UlTypes"
import User from '../models/User'

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
   try {
      // Se obtiene el authorization de los headers 
      const authorization: string = val2String(req.get('authorization'))

      // Se verifica que no sea string vacío y que comience con 'bearer'
      if (!(authorization && authorization.toLowerCase().startsWith('bearer')))
         throw RstError(Error401, TErr401.token)

      // Se extrae el token del authorization
      let token: string = authorization.split(' ')[1]

      // Se decodifica el token
      let decodedToken: TJSONObject = jwt.verify(token, val2String(process.env.JWT_SECRET)) as TJSONObject

      // Obtener el id del usuario loggeado
      let userId: string = decodedToken["id"]

      // Buscar el id en la base de datos para asegurarse de que existe
      let bExisteUsuario: boolean = val2Bool(await User.count({ where: { id: userId } }))

      // Si no existe el usuario se entrega un error
      if (!bExisteUsuario)
         throw RstError(Error401, TErr401.other, 'El usuario con el id dado no existe')

      // Agregar el id del usuario al request
      req.userId = decodedToken["id"]

      next()
   } catch (error) {
      next(error)
   }
}