import { me } from "../controllers/user.controller"

import express from "express"
import { validateSession } from "../middleware/auth.middleware"

export function userRoutes() {
  const router = express.Router()

  router.get("/", validateSession, me)

  return router
}
