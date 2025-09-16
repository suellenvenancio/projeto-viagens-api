import { RegisterUserInput } from "../types/user.types"
import { LoginUserInput } from "../types/auth.types"
import { createUser, updateUser } from "../services/user.service"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"
import { sendResponse } from "../utils/sendResponse"
import authentication from "../repository/authentication"
import session from "../repository/session"
import user from "../repository/user"

import dotenv from "dotenv"
import * as cookie from "cookie"

dotenv.config()

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as LoginUserInput

  try {
    const result = await authentication.validate(email, password)

    const newSession = await session.createSession(result.id)
    cookie.serialize("session_id", newSession.token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: session.EXPIRATIONS_IN_MILLISECONDS / 1000,
    })

    return sendResponse(res, 200, "Session created successfully", {
      session: newSession,
    })
  } catch (error) {
    console.error("Error creating session:", error)
    if (error instanceof AppError) {
      return next(error)
    }
    throw error
  }
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body as RegisterUserInput

  try {
    await user.validationUniqueEmail(userData.email)
    const newUser = await createUser({
      ...userData,
    })

    return sendResponse(res, 201, "User registered successfully", {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    })
  } catch (error) {
    console.error("Error registering user:", error)
    return next(new AppError("Error registering user", 500))
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies

    return sendResponse(res, 200, "Logout successful")
  } catch (error) {
    console.error("Error logging out:", error)
    return next(new AppError("Error logging out", 500))
  }
}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, token, password } = req.body

    const user = await authentication.validate(email, password)

    await session.findSessionByToken(token)
    const hashedPassword = await password.hash(password, 14)
    await updateUser(user.id, {
      password: hashedPassword,
    })

    return sendResponse(res, 200, "Password reset successfully")
  } catch (error) {
    console.error("Error resetting password:", error)
    return next(new AppError("Error resetting password", 500))
  }
}
