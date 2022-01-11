import { Request } from "express"
import ResultHistory from "../models/ResultsHistory"
import SearchHistory from "../models/SearchHistory"
import { getResponse } from "../utils/UlResponse"
import { TResponseData } from "../utils/UlTypes"

export const getHistory = (req: Request): Promise<TResponseData> => {
   return new Promise<TResponseData>(async (resolve, reject) => {
      try {
         let userid: string = req.userId
         let history = await SearchHistory.findAll({
            include: [{
               model: ResultHistory,
               required: true
            }],
            where: { userid }
         })

         resolve(getResponse(req, history))
      } catch (error) {
         reject(error)
      }
   })
}