import { me } from "../controllers/user.controller"

import express from "express"
import { authCheck } from "../middleware/auth.middleware"

export const userRoutes = () => {
    const router = express.Router()

    router.get("/me", authCheck, me)

    return router
}
