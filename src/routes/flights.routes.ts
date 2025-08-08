import {
    createNewFlight,
    deleteFlightById,
    getFlightById,
    getFlightsByUser,
    updateFlightById,
} from "../controllers/flights.controller"
import { authCheck } from "../middleware/auth.middleware"

import express from "express"

export function flightsRoutes() {
    const router = express.Router()

    router.get("/:id", authCheck, getFlightById)
    router.post("/", authCheck, createNewFlight)
    router.put("/:id", authCheck, updateFlightById)
    router.delete("/:id", authCheck, deleteFlightById)
    router.get("/user/:userId", getFlightsByUser)
    return router
}
