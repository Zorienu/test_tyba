import { NextFunction, Request, Response } from "express";
import { paths } from "../includes/UlConst";
import { getHistory } from "../includes/UlHistory";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { TController } from "../utils/UlTypes";

export class THistoryController extends TController {
   constructor() { super(paths.history) }

   protected initializeRoutes(): void {
      this.router.get('/', isAuthenticated, this.getHistory)
   }

   private async getHistory(req: Request, res: Response, next: NextFunction) {
      try {
         res.status(201).json(await getHistory(req))
      } catch (error) {
         next(error)
      }
   }
}