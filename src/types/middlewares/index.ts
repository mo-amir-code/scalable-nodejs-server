import { NextFunction, Request, Response } from "express";

type APIHandlerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>

interface APISuccessType {
    res: Response,
    message: string,
    statusCode: number,
    data?: any
}

export type {
    APIHandlerType,
    APISuccessType
}