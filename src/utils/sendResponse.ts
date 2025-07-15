import { Response } from "express"

export function sendResponse(
    res: Response,
    statusCode: number,
    message: string,
    data?: any
): void {
    res.status(statusCode).json({
        statusCode,
        message,
        data,
    })
}
