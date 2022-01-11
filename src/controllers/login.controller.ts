import { NextFunction, Request, Response } from "express";
import { paths } from "../includes/UlConst";
import { loginUser } from "../includes/UlLogin";
import { val2Number } from "../utils/UlParse";
import { getResponse } from "../utils/UlResponse";
import { TController } from "../utils/UlTypes";

export class TLoginController extends TController {
   constructor() { super(paths.login) }

   protected initializeRoutes(): void {
      this.router.post('/login', this.login)
      this.router.get('/logout', this.logout)
   }

   private async login(req: Request, res: Response, next: NextFunction) {
      try {
         let response = await loginUser(req)
         let token = response.body!.token
         let maxAge: number = val2Number(process.env.TOKEN_MAX_AGE)
         res.cookie('jwt', token, { maxAge })
         res.status(200).send(await loginUser(req))
         next()
      } catch (error) {
         next(error)
      }
   }

   private async logout(req: Request, res: Response, next: NextFunction) {
      try {
         // Establecer cookie del jsonwebtoken a string vacío
         res.cookie('jwt', '', { maxAge: 1 })
         res.status(200).send(getResponse(req, { bloggedout: true }))
         next()
      } catch (error) {
         next(error)
      }
   }
}