import express from "express"

import { z } from "zod"
import {
  login,
  logout,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller"
import {
  loginSchema,
  logoutSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/user.schema"
import { validate } from "../middleware/validate"

export function authRoutes() {
  const router = express.Router()

  router.post("/register", validate(registerSchema), registerUser)
  router.post("/login", validate(loginSchema), login)
  router.post("/logout", validate(logoutSchema), logout)
  router.post("/resetPassword", validate(resetPasswordSchema), resetPassword)

  return router
}
