import { NextFunction, Request, Response } from "express";
import { JSONKeysToLowerCase } from "../utils/UlJSONUtils";

export function bodyKeysToLowerCase(req: Request, res: Response, next: NextFunction): void {
   req.body = JSONKeysToLowerCase(req.body)
   next()
}