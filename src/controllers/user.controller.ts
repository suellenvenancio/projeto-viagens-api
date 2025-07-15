import { Request, Response, NextFunction } from "express"
import { getUserById } from "../services/user.service"
import { AppError } from "../errors"
import { sendResponse } from "../utils/sendResponse"
import { findToken } from "../services/auth.service"

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token =
            req.headers.authorization?.startsWith("Bearer ") &&
            req.headers.authorization.split(" ")[1]

        if (!token) {
            return next(new AppError("Token not provided", 401))
        }

        const findedToken = await findToken(token)
        if (!findedToken) {
            return next(new AppError("Token not found", 404))
        }

        const user = await getUserById(findedToken.userId)
        if (!user) {
            return next(new AppError("User not found", 404))
        }

        sendResponse(res, 200, "User fetched successfully", {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
    } catch (error) {
        console.error("Error fetching user:", error)
        return next(new AppError("Internal server error", 500))
    }
}
