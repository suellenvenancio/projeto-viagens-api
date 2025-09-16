import { authRoutes } from "./routes/auth.routes"
import { userRoutes } from "./routes/user.routes"
import { flightsRoutes } from "./routes/flights.routes"
import { hotelsRoutes } from "./routes/hotels.routes"
import { attractionsRoutes } from "./routes/attractions.routes"

import { PrismaClient } from "./generated/prisma"

import morgan from "morgan"
import express from "express"
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
    credentials: false,
  }

  app.use(helmet())
  app.use(cors())
  app.use(express.json())

  app.listen(3000, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  })

  app.use(morgan("dev"))

  app.use(`/auth`, authRoutes())
  app.use(`/me`, userRoutes())
  app.use(`/flights`, flightsRoutes())
  app.use(`/hotels`, hotelsRoutes())
  app.use(`/attractions`, attractionsRoutes())

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
