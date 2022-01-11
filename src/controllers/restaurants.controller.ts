import { NextFunction, Request, Response } from "express"
import { paths } from "../includes/UlConst"
import { getNearRestaurants, getNearRestaurantsCity } from "../includes/UlRestaurants"
import { TController } from "../utils/UlTypes"

export class TRestaurantsController extends TController {
   constructor() { super(paths.restaurants) }

   protected initializeRoutes(): void {
      this.router.get('/:latitude/:longitude', this.getNearRestaurants)
      this.router.get('/:city', this.getNearRestaurantsCity)
   }

   private async getNearRestaurants(req: Request, res: Response, next: NextFunction) {
      try {
         res.status(201).json(await getNearRestaurants(req))
      } catch (error) {
         next(error)
      }
   }

   private async getNearRestaurantsCity(req: Request, res: Response, next: NextFunction) {
      try {
         res.status(201).json(await getNearRestaurantsCity(req))
      } catch (error) {
         next(error)
      }
   }
}