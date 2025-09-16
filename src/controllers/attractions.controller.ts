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

export const getAttractionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const attraction = await findAttractionDB(id)

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
    const updatedAttraction = await updateAttractionDB(
      attractionId,
      attractionData
    )

    return sendResponse(res, 200, "Attraction updated successfully", {
      data: updatedAttraction,
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
    await deleteAttractionDB(id)

    return sendResponse(res, 200, "Attraction deleted successfully")
  } catch (error) {
    console.error("Error deleting attraction:", error)
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
