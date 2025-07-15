import { RegisterUserInput } from "../types/user.types"
import { LoginUserInput } from "../types/auth.types"
import {
    createUser,
    getUserByEmail,
    updateUser,
} from "../services/user.service"

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

import {
    findToken,
    generateAcessToken,
    generateRefreshToken,
    revokeToken,
} from "../services/auth.service"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"
import { sendResponse } from "../utils/sendResponse"

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userData = req.body as RegisterUserInput

    try {
        const existentUser = await getUserByEmail(userData.email)
        if (existentUser) {
            return next(new AppError("User already exists", 400))
        }

        const password = await bcrypt.hash(userData.password, 12)
        const newUser = await createUser({
            ...userData,
            password,
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

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body as LoginUserInput

        const user = await getUserByEmail(email)
        if (!user) {
            return next(new AppError("User not found", 404))
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return next(new AppError("Invalid password", 401))
        }

        const refreshToken = await generateRefreshToken(user.id)
        const accessToken = await generateAcessToken(user.id)

        return sendResponse(res, 200, "Login successful", {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            refreshToken,
            accessToken,
        })
    } catch (error) {
        console.error("Error logging in:", error)
        return next(new AppError("Error logging in", 500))
    }
}

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.body

        const storagedToken = await findToken(token)
        if (!storagedToken) {
            return next(new AppError("Token not found", 401))
        }

        await revokeToken(storagedToken.id)
        return sendResponse(res, 200, "Logout successful")
    } catch (error) {
        console.error("Error logging out:", error)
        return next(new AppError("Error logging out", 500))
    }
}

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const refreshToken = req.body.refreshToken
        const storagedToken = await findToken(refreshToken)
        if (!storagedToken || storagedToken.userId)
            return next(new AppError("Refresh token not found or revoked", 401))

        const secret = process.env.JWT_ACESS_TOKEN_SECRET
        if (!secret)
            return next(
                new AppError("JWT access token secret is not defined", 500)
            )

        jwt.verify(
            refreshToken,
            secret,
            async (err: jwt.VerifyErrors | null) => {
                if (err) return next(new AppError("Token invalid!", 403))

                const newTokenRefreshToken = await generateRefreshToken(
                    storagedToken.userId
                )
                const newTokenAcessToken = await generateAcessToken(
                    storagedToken.userId
                )

                return sendResponse(res, 200, "Token refreshed successfully", {
                    acessToken: newTokenAcessToken,
                    refreshToken: newTokenRefreshToken,
                })
            }
        )
    } catch (error) {
        console.error("Error refreshing access token:", error)
        return next(new AppError("Error refreshing access token", 500))
    }
}

export const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, token, password } = req.body

        const user = await getUserByEmail(email)
        if (!user) {
            return next(new AppError("User not found", 404))
        }

        const findedToken = await findToken(token)
        if (
            !findToken ||
            findedToken?.revoked ||
            findedToken?.userId !== user.id ||
            findedToken.expiresAt < new Date()
        ) {
            return next(new AppError("Invalid or expired token", 401))
        }

        await updateUser(user.id, {
            password: await bcrypt.hash(password, 10),
        })

        return sendResponse(res, 200, "Password reset successfully")
    } catch (error) {
        console.error("Error resetting password:", error)
        return next(new AppError("Error resetting password", 500))
    }
}
