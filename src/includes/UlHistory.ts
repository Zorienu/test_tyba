import { Request } from "express"
import { getResponse } from "../utils/UlResponse"
import { TResponseData } from "../utils/UlTypes"

export const getHistory = (req: Request): Promise<TResponseData> => {
   return new Promise<TResponseData>(async (resolve, reject) => {
      try {
         resolve(getResponse(req, { hola: 'hola' }))
      } catch (error) {
         reject(error)
      }
   })
}