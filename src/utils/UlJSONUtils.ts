import { TJSONObject } from "./UlTypes"

/**
 * Valida si un objeto está vacio o no, es decir que no tiene propiedades
 * @param obj objeto a evaluar
 * @returns boolean que indica si el objeto está o no vacío
 */
export function isEmptyObject(obj: any): boolean {
   try {
      if (typeof obj !== "object")
         return true;
      if (Object.keys(obj).length !== 0)
         return false;
      return true
   } catch (error) {
      return true
   }
}

/**
 * Convierte las llaves de un JSON en minúscula
 * @param obj JSON a convertir
 * @returns JSON con las key en minúscula
 */
export function JSONKeysToLowerCase(obj: TJSONObject): any {
   let isArray: boolean = Array.isArray(obj)
   let result: any = isArray ? [] : {}

   for (let key in obj) {
      let val: any = obj[key]
      let keyLowerCase: string = key.toLowerCase()

      if (typeof val === 'object' && !isEmptyObject(obj))
         val = JSONKeysToLowerCase(val)

      if (isArray)
         result.push(val)
      else
         result[keyLowerCase] = val
   }

   return result
}