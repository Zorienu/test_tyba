import { Request, Response, NextFunction } from 'express'
import { Error500, TErr500, TErrorServer as TServerError } from '../utils/UlError'
import { TResponseError } from '../utils/UlTypes'

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
   req.fhEnd = new Date()
   let statusCode: number = Error500.statuscode
   let result: TResponseError = {
      information: {
         result: false,
         internalcode: 500000,
         fhstart: req.fhStart,
         fhend: req.fhEnd,
         time: req.fhEnd.getTime() - req.fhStart.getTime(),
         msg: 'Ha ocurrido un error en nuestros servidores',
      }
   }

   if (err instanceof TServerError) {
      result.information.msg = `[${err.name}]: ${err.message}`
      result.information.internalcode = err.internalCode
      statusCode = err.statusCode
   } else if (err instanceof Error) {
      result.information.msg = `[${Error500.name}]: ${err.message}`
   }

   res.status(statusCode).json(result)

   next()
}