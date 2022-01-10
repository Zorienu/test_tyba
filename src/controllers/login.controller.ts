import { NextFunction, Request, Response } from "express";
import { loginUser } from "../includes/UlLogin";
import { TController } from "../utils/UlTypes";

export class TLoginController extends TController {
   constructor() { super('/api/login') }

   protected initializeRoutes(): void {
      this.router.post('/', this.login)
   }

   private async login(req: Request, res: Response, next: NextFunction) {
      try {
         res.status(200).send(await loginUser(req))
         next()
      } catch (error) {
         next(error)
      }
   }
}