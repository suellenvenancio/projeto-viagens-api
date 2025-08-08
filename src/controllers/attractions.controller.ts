import { AppError } from "../errors"
import {
    findAttractionDB,
    createAttractionDB,
    deleteAttractionDB,
    getAllAttractionsByUserIdDB,
    updateAttractionDB,
} from "../services/attractions.service"
import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../utils/sendResponse"
import { getUserById } from "../services/user.service"
import { findToken } from "../services/auth.service"

export const getAttractionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params
    try {
        const attraction = await findAttractionDB(id)
        if (!attraction) {
            return next(new AppError("Attraction not found", 404))
        }

        sendResponse(res, 200, "Attraction retrieved successfully", {
            data: attraction,
        })
    } catch (error) {
        console.error("Error getting attraction by ID:", error)
        return next(new AppError("Internal server error", 500))
    }
}

export const createNewAttraction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const attractionData = req.body

    try {
        const newAttraction = await createAttractionDB(attractionData)
        return sendResponse(res, 201, "Attraction created successfully", {
            data: newAttraction,
        })
    } catch (error) {
        console.error("Error creating attraction:", error)
        return next(new AppError("Internal server error", 500))
    }
}

export const updateAttractionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { attractionId } = req.params
    const attractionData = req.body

    try {
        const attraction = await findAttractionDB(attractionId)
        if (!attraction) {
            return next(new AppError("Attraction not found", 404))
        }

        const updatedHotel = await updateAttractionDB(
            attractionId,
            attractionData
        )

        return sendResponse(res, 200, "Hotel updated successfully", {
            data: updatedHotel,
        })
    } catch (error) {
        console.error("Error updating hotel:", error)
        return next(new AppError("Internal server error", 500))
    }
}

export const deleteAttractionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params

    try {
        const hotel = await findAttractionDB(id)
        if (!hotel) {
            return next(new AppError("Hotel not found", 404))
        }

        await deleteAttractionDB(id)

        return sendResponse(res, 200, "Hotel deleted successfully")
    } catch (error) {
        console.error("Error deleting hotel:", error)
        return next(new AppError("Internal server error", 500))
    }
}

export const getAttractionsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params

        const attractions = await getAllAttractionsByUserIdDB(userId)
        return sendResponse(
            res,
            200,
            "Attractions retrieved successfully",
            attractions
        )
    } catch (error) {
        console.error("Error getting all attractions:", error)
        return next(new AppError("Internal server error", 500))
    }
}
