import {
  createNewAttraction,
  deleteAttractionById,
  getAttractionById,
  getAttractionsByUser,
  updateAttractionById,
} from "../controllers/attractions.controller"

import express from "express"

export function attractionsRoutes() {
  const router = express.Router()

  router.get("/:id", getAttractionById)
  router.post("/", createNewAttraction)
  router.put("/:id", updateAttractionById)
  router.delete("/:id", deleteAttractionById)
  router.get("/user/:userId", getAttractionsByUser)
  return router
}
