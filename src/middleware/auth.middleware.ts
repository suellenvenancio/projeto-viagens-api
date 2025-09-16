import { Request, Response, NextFunction } from "express"

import session from "../repository/session"
import { AppError } from "../errors"

export const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.cookies.session_id
    if (!sessionId) {
      return next(new AppError("Session not found!", 404))
    }

    await session.findSessionByToken(sessionId)
  } catch (error) {
    return next(new AppError("Unauthorized!", 401))
  }
}
