import { me } from "../controllers/user.controller"

import express from "express"
import { authCheck } from "../middleware/auth.middleware"

export function userRoutes() {
    const router = express.Router()

    router.get("/", authCheck, me)

    return router
}
