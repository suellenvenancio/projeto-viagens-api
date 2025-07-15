import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors"

import dotenv from "dotenv"
dotenv.config()

const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = 500
    let message = "Internal Server Error"
    let errors: any = undefined

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    }

    if (process.env.NODE_ENV !== "production") {
        console.error("Error:", err)
    }

    const response: any = {
        statusCode,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    }

    res.status(statusCode).json(response)
}

export default errorMiddleware
