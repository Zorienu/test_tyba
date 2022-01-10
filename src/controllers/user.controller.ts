import { NextFunction, Request, Response } from "express";
import { paths } from "../includes/UlConst";
import { registerUser } from "../includes/UlUsers";
import { TController } from "../utils/UlTypes";

export class TUserController extends TController {
   constructor() { super(paths.users) }

   protected initializeRoutes(): void {
      this.router.post('/', this.registerUser)
   }

   private async registerUser(req: Request, res: Response, next: NextFunction) {
      try {
         res.status(201).json(await registerUser(req))
      } catch (error) {
         next(error)
      }
   }
}