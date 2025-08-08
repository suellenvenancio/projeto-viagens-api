import {
    createNewAttraction,
    deleteAttractionById,
    getAttractionById,
    getAttractionsByUser,
    updateAttractionById,
} from "../controllers/attractions.controller"
import { authCheck } from "../middleware/auth.middleware"

import express from "express"

export function attractionsRoutes() {
    const router = express.Router()

    router.get("/:id", authCheck, getAttractionById)
    router.post("/", authCheck, createNewAttraction)
    router.put("/:id", authCheck, updateAttractionById)
    router.delete("/:id", authCheck, deleteAttractionById)
    router.get("/user/:userId", getAttractionsByUser)
    return router
}
