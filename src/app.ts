import { authRoutes } from "./routes/auth.routes"
import { userRoutes } from "./routes/user.routes"

import { PrismaClient } from "./generated/prisma"

import morgan from "morgan"
import express, { Response } from "express"
import cors from "cors"
import helmet from "helmet"
import errorMiddleware from "./middleware/error.middleware"
import dotenv from "dotenv"
dotenv.config()

export const prisma = new PrismaClient()
const app = express()

async function main() {
    const PORT = process.env.PORT || 3000

    const corsOptions = {
        origin: [process.env.CLIENT_URL!],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    }

    app.use(helmet())
    app.use(cors(corsOptions))
    app.use(express.json())

    app.get("/api/healthchecker", (_, res: Response) => {
        res.status(200).json({
            status: "success",
            message: "Welcome to NodeJs with Prisma and PostgreSQL",
        })
    })

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    })

    app.use(morgan("dev"))

    app.use(`/auth`, authRoutes())
    app.use(`/user`, userRoutes())

    app.use(errorMiddleware)
}

main()
    .catch((err) => {
        console.error("Erro fatal na aplicação:", err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
