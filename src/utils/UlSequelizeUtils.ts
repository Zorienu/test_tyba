import { Error400, RstError, TErr400 } from "./UlError"
import { val2String } from "./UlParse"
import { TJSONObject } from "./UlTypes"

/**
 * Obtiene los nombre de los campos de un modelo de Sequelize
 * @param fields campos obtenidos con la función `Model.rawAttributes`
 * @param ignoreFields Listado de campos a ignorar en la validación
 * @return Listado de campos del modelo
 */
export function getFields(fields: TJSONObject, ignoreFields: string[] = []): string[] {
   let result: string[] = []
   for (let field in fields)
      if (!ignoreFields.includes(field))
         result.push(field)
   return result
}

/**
 * Verifica que los campos indicados en el array `fields` vengan definidos en el JSON `obj`
 * además se ignoran los campos definidos en `ignoreFields`
 * Si alguno de los campos no es válido se entrega un error al cliente indicando el campo faltante
 * @param fields Listado de campos a validar
 * @param obj JSON a validar
 * @param ignoreFields Listado de campos a ignorar en la validación
 */
export function verifyJSONBody(fields: string[], obj: TJSONObject, ignoreFields: string[] = []): void {
   try {
      // Se recorren los campos del modelo
      for (let field of fields)
         // Se verifica si la columna no tiene valor en el JSON del body
         // solo si la columna no se debe ignorar (esto para los campos IDENTITY)
         if (!val2String(obj[field]) && !ignoreFields.includes(field))
            throw RstError(Error400, TErr400.bodyParam, field)
   } catch (error) {
      throw error
   }
}