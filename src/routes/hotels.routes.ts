import {
    createNewHotel,
    deleteHotelById,
    getHotelById,
    getHotelsByUser,
    updateHotelById,
} from "../controllers/hotels.controller"
import { authCheck } from "../middleware/auth.middleware"

import express from "express"

export function hotelsRoutes() {
    const router = express.Router()

    router.get("/:id", authCheck, getHotelById)
    router.post("/", authCheck, createNewHotel)
    router.put("/:id", authCheck, updateHotelById)
    router.delete("/:id", authCheck, deleteHotelById)
    router.get("/user/:userId", getHotelsByUser)

    return router
}
