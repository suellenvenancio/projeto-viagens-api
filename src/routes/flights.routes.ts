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

  router.get("/:id", getFlightById)
  router.get("/:id", getFlightById)
  router.post("/", createNewFlight)
  router.put("/:id", updateFlightById)
  router.delete("/:id", deleteFlightById)
  router.get("/user/:userId", getFlightsByUser)
  return router
}
