import { TJSONObject, TResponseData } from "./UlTypes"
import { Request } from 'express'

/**
 * Agrega información adicional al JSON a entregar al cliente 
 * como el tiempo que tomó la petición y las fechas de entrada y salida
 * @param req Objeto Request
 * @param body JSON a entregar al cliente
 * @returns JSON con información adicional
 */
export function getResponse(req: Request, body: TJSONObject): TResponseData {
   try {
      // Establecer fecha de terminación de la ejecución
      req.fhEnd = new Date()
      // Construir JSON con información adicional para entregarla al cliente
      let result: TResponseData = {
         information: {
            result: true,
            fhstart: req.fhStart,
            fhend: req.fhEnd,
            time: req.fhEnd.getTime() - req.fhStart.getTime()
         },
         body
      }

      return result
   } catch (error) {
      throw error
   }
}
