import { AppError } from "../errors"
import {
  createHotelDB,
  deleteHotelByIdDB,
  getAllHotelsByUserIdDB,
  findHotelByIdDB,
  updateHotelDB,
} from "../services/hotels.service"
import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../utils/sendResponse"

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const hotel = await findHotelByIdDB(id)

    sendResponse(res, 200, "Hotel retrieved successfully", {
      data: hotel,
    })
  } catch (error) {
    console.error("Error getting hotel by ID:", error)
    return next(new AppError("Internal server error", 500))
  }
}

export const createNewHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hotelData = req.body

  try {
    const newHotel = await createHotelDB(hotelData)
    return sendResponse(res, 201, "Hotel created successfully", {
      data: newHotel,
    })
  } catch (error) {
    console.error("Error creating hotel:", error)
    return next(new AppError("Internal server error", 500))
  }
}

export const updateHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { hotelId } = req.params
  const hotelData = req.body

  try {
    const updatedHotel = await updateHotelDB(hotelId, hotelData)

    return sendResponse(res, 200, "Hotel updated successfully", {
      data: updatedHotel,
    })
  } catch (error) {
    console.error("Error updating hotel:", error)
    return next(new AppError("Internal server error", 500))
  }
}

export const deleteHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  try {
    await deleteHotelByIdDB(id)

    return sendResponse(res, 200, "Hotel deleted successfully")
  } catch (error) {
    console.error("Error deleting hotel:", error)
    return next(new AppError("Internal server error", 500))
  }
}

export const getHotelsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params

    const hotels = await getAllHotelsByUserIdDB(userId)
    return sendResponse(res, 200, "Hotels retrieved successfully", hotels)
  } catch (error) {
    console.error("Error getting all hotels:", error)
    return next(new AppError("Internal server error", 500))
  }
}
