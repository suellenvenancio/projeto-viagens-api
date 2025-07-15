import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.headers.authorization?.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const secret = process.env.JWT_ACESS_TOKEN_SECRET
    if (!secret) {
        console.error("JWT access token secret is not defined")
        return res.status(500).json({ message: "Internal server error" })
    }

    jwt.verify(
        token,
        secret,
        (
            err: jwt.VerifyErrors | null,
            decoded: string | JwtPayload | undefined
        ) => {
            if (err) {
                return res.status(403).json({ message: "Token invalid!" })
            }
            req.user = decoded as JwtPayload
            next()
        }
    )
}
