import dotenvflow from 'dotenv-flow'
dotenvflow.config()

import { TApp } from './App'
import { THistoryController } from './controllers/history.controller'
import { TUserController } from './controllers/user.controller'
import { TLoginController } from './controllers/login.controller'
import { val2Number } from './utils/UlParse'
import { TController } from './utils/UlTypes'
import { TRestaurantsController } from './controllers/restaurants.controller'

// Añadir los campos 'fhstart' y 'fhend' a la interfaz Request
// también el campo 'userId' para poder guardar el id del usuario que llega en el jwt
declare global {
   namespace Express {
      interface Request {
         fhStart: Date
         fhEnd: Date
         userId: string
      }
   }
}

// Se definen los controladores a usar
const controllers: Array<TController> = [
   new TUserController(),
   new THistoryController(),
   new TLoginController(),
   new TRestaurantsController(),
]

let port: number = val2Number(process.env.SERVER_PORT)
export const App: TApp = new TApp(controllers, port)

App.listen()