import axios from 'axios'
import { Request } from "express"
import { JSONKeysToLowerCase } from '../utils/UlJSONUtils'
import { val2Number, val2String } from "../utils/UlParse"
import { getResponse } from "../utils/UlResponse"
import { TJSONObject, TResponseData } from "../utils/UlTypes"

export const getNearRestaurants = (req: Request): Promise<TResponseData> => {
   return new Promise<TResponseData>(async (resolve, reject) => {
      try {
         let { latitude, longitude } = req.params

         // Establecer el radio de búsqueda
         let radius: number = val2Number(process.env.SEARCH_RADIUS)

         // Establecer la categoría a buscar
         let category: string = 'eat-drink'

         // Obtener la URL base de 'hereapi'
         let baseURL: string = val2String(process.env.RESTAURANTS_API)

         // Obtener las keys para realizar la petición
         // let APIKey: string = val2String(process.env.API_KEY)
         let appCode: string = val2String(process.env.APP_CODE)
         let appID: string = val2String(process.env.APP_ID)


         // let fullURL: string = `${baseURL}?apiKey=${APIKey}&in${latitude},${longitude};r=${radius}&cat=${category}`
         let fullURL: string = `${baseURL}?app_code=${appCode}&app_id=${appID}&in=${latitude},${longitude};r=${radius}&cat=${category}`

         // Hacer petición
         let result = await axios.get(fullURL)

         // Obtener los resultados
         let restaurants = result.data.results.items
         JSONKeysToLowerCase(restaurants)

         let response: Array<TJSONObject> = []

         for (let restaurant of restaurants) {
            let tempRestaurant: TJSONObject = {}
            tempRestaurant["position"] = restaurant["position"]
            tempRestaurant["distance"] = restaurant["distance"]
            tempRestaurant["title"] = restaurant["title"]
            tempRestaurant["averagerating"] = restaurant["averagerating"]
            tempRestaurant["address"] = restaurant["address"]["text"]
            response.push(tempRestaurant)
         }


         resolve(getResponse(req, response))
      } catch (error) {
         reject(error)
      }
   })
}

export const getNearRestaurantsCity = (req: Request): Promise<TResponseData> => {
   return new Promise<TResponseData>(async (resolve, reject) => {
      try {
         let { city } = req.params

         // Establecer el radio de búsqueda
         let radius: number = val2Number(process.env.SEARCH_RADIUS)

         // Establecer la categoría a buscar
         let category: string = 'eat-drink'

         // Obtener la URL base de 'hereapi'
         let baseURL: string = val2String(process.env.RESTAURANTS_API)

         // Obtener las keys para realizar la petición
         // let APIKey: string = val2String(process.env.API_KEY)
         let appCode: string = val2String(process.env.APP_CODE)
         let appID: string = val2String(process.env.APP_ID)


         // let fullURL: string = `${baseURL}?apiKey=${APIKey}&in${latitude},${longitude};r=${radius}&cat=${category}`
         let latitude = 0
         let longitude = 0

         let fullURL: string = `${baseURL}?app_code=${appCode}&app_id=${appID}&in=${latitude},${longitude};r=${radius}&cat=${category}`

         // Hacer petición
         let result = await axios.get(fullURL)

         // Obtener los resultados
         let restaurants = result.data.results.items
         JSONKeysToLowerCase(restaurants)

         let response: Array<TJSONObject> = []

         for (let restaurant of restaurants) {
            let tempRestaurant: TJSONObject = {}
            tempRestaurant["position"] = restaurant["position"]
            tempRestaurant["distance"] = restaurant["distance"]
            tempRestaurant["title"] = restaurant["title"]
            tempRestaurant["averagerating"] = restaurant["averagerating"]
            tempRestaurant["address"] = restaurant["address"]["text"]
            response.push(tempRestaurant)
         }


         resolve(getResponse(req, response))
      } catch (error) {
         reject(error)
      }
   })
}