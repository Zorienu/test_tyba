/**
 * Convierte el valor dado en una cadena de texto
 * @param val valor a convertir
 * @param def valor por defecto en caso de que el valor dado no se pueda convertir
 * @returns valor de tipo string
 */
export function val2String(val: any, def: string = ''): string {
   let result: string = def
   try {
      if (val === undefined || val === null)
         result = def
      else if (typeof val === 'string')
         result = val
      else if (typeof val === 'boolean' || typeof val === 'number')
         result = JSON.stringify(val)
      else
         result = JSON.stringify(val)
   } finally {
      return result
   }
}

/**
 * Convierte el valor dado en una un booleano
 * @param val valor a convertir
 * @param def valor por defecto en caso de que el valor dado no se pueda convertir
 * @returns valor de tipo boolean
 */
export function val2Bool(val: any, def: boolean = false): boolean {
   let result: boolean = def
   try {
      val = val2String(val).toLowerCase()

      switch (val) {
         case '1':
         case 'true':
         case 't':
            result = true
            break
         default:
            result = false
      }
   } finally {
      return result
   }
}


/**
 * Convierte el valor dado en número
 * @param val valor a convertir
 * @param def valor por defecto en caso de que el valor dado no se pueda convertir
 * @returns valor de tipo number
 */
export function val2Number(val: any, def: number = 0): number {
   let result: number = def
   try {
      let s: string = val2String(val, '')
      // Si la cadena incluye el punto decimal se transforma en flotante
      if (s.includes('.'))
         result = parseFloat(s)
      else
         result = parseInt(s)

      if (isNaN(result))
         result = def
   } finally {
      return result
   }
}
