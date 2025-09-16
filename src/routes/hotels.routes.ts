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

  router.get("/:id", getHotelById)
  router.post("/", createNewHotel)
  router.put("/:id", updateHotelById)
  router.delete("/:id", deleteHotelById)
  router.get("/user/:userId", getHotelsByUser)

  return router
}
