import { PrismaClient, User } from "../generated/prisma"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config()

const prisma = new PrismaClient()

export const generateRefreshToken = async (userId: string) => {
    const authToken = process.env.JWT_ACESS_TOKEN_SECRET
    const expiresIn = 86400

    if (!authToken) {
        throw new Error("JWT access token secret is not defined")
    }
    const token = jwt.sign({ id: userId }, authToken, {
        expiresIn,
    })

    await prisma.refreshToken.create({
        data: {
            token,
            userId: userId,
            expiresAt: new Date(Date.now() + Number(expiresIn) * 1000),
            createdAt: new Date(),
        },
    })

    return token
}

export const generateAcessToken = async (userId: string) => {
    const authToken = process.env.JWT_ACESS_TOKEN_SECRET
    if (!authToken) {
        throw new Error("JWT access token secret is not defined")
    }

    return jwt.sign({ id: userId }, authToken, {
        expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
    })
}

export const findToken = async (token: string) => {
    console.log(token)
    return await prisma.refreshToken.findFirst({
        where: { token },
    })
}

export const revokeToken = async (id: string) => {
    return await prisma.refreshToken.update({
        where: { id },
        data: { revoked: true },
    })
}
