import { Request, Response, NextFunction } from "express"
import { findUserByToken, getUserById } from "../services/user.service"
import { AppError } from "../errors"
import { sendResponse } from "../utils/sendResponse"

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.session_id

    if (!token) {
      return next(new AppError("Token not found!", 404))
    }

    const user = await findUserByToken(token)

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
