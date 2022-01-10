import express, { Application } from "express";
import { Server } from "http";
import { bodyKeysToLowerCase } from "./middlewares/bodyKeysToLowerCase";
import { errorHandler } from "./middlewares/errorHandler";
import { setStartDate } from "./middlewares/setStartDate";
import { TController } from "./utils/UlTypes";

export class TApp {
   public app: Application
   public port: number
   public server: Server = new Server()

   constructor(controllers: Array<TController>, port: number) {
      this.app = express()
      this.port = port

      this.setMiddlewares()
      this.setControllers(controllers)
      this.setOutMiddlewares()
   }

   private setMiddlewares() {
      // Convertir JSON a objeto de JS
      this.app.use(express.json())
      // Convertir datos enviados a través de formulario
      // extended: false -> no aceptar datos como imágenes, solo datos simple como cajas de texto
      this.app.use(express.urlencoded({ extended: false }))
      // Con cada petición se establecerá la fecha de entrada
      this.app.use(setStartDate)
      // Convertir las keys del JSON del body a minúscula
      this.app.use(bodyKeysToLowerCase)
   }

   private setControllers(controllers: Array<TController>) {
      for (let controller of controllers)
         this.app.use(controller.path, controller.router)
   }

   private setOutMiddlewares() {
      // Recibir errores que ocurran durante la ejecución y complementarlos con información adicional
      this.app.use(errorHandler)
   }

   public listen() {
      this.server = this.app.listen(this.port, () => {
         console.log(`App listening on port ${this.port}`)
      })
   }
}