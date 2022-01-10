import { Router } from "express"

export type TJSONObject = {
   [key: string]: any
}

// Clase base para definir el comportamiento de los controladores
export abstract class TController {
   public path: string
   public router: Router

   constructor(path: string) {
      this.path = path
      this.router = Router()
      this.initializeRoutes()
   }

   protected initializeRoutes() { }
}

// Estructura base del JSON a entregar al cliente
export type TResponseData = {
   information: {
      result: boolean,
      fhstart: Date,
      fhend: Date,
      time: number,
   },
   body?: TJSONObject
}

// Estructura del JSON a entregar al cliente cuando se presente un error
export type TResponseError = {
   information: {
      result: boolean,
      fhstart: Date,
      fhend: Date,
      time: number,
      internalcode: number,
      msg: string
   }
}

// Tipos para agregar información adicional a las respuestas con error
export type THTTPError = { internalcode: number, getmsg: Function }
export type THTTPErrorInfo = {
   name: string,
   statuscode: number,
   error: { [key: string]: THTTPError }
}