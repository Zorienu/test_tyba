import { Request, Response, NextFunction } from 'express'

// Establecer la fecha en la que se inicia la ejecución de alguna ruta
export const setStartDate = (req: Request, res: Response, next: NextFunction) => { req.fhStart = new Date(); next() }