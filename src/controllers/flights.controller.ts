import { AppError } from "../errors"
import {
  createFlightDB,
  deleteFlightDB,
  getAllFlightsByUserIdDB,
  findFlightByIdDB,
  updateFlightByIdDB,
} from "../services/flights.service"
import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../utils/sendResponse"

export const getFlightById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const flight = await findFlightByIdDB(id)

    sendResponse(res, 200, "Flight retrieved successfully", {
      data: flight,
    })
  } catch (error) {
    console.error("Error getting flight by ID:", error)
    return next(new AppError("Internal server error", 500))
  }
}

export const createNewFlight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const flightData = req.body

  try {
    const newFlight = await createFlightDB(flightData)
    return sendResponse(res, 201, "Flight created successfully", {
      data: newFlight,
    })
  } catch (error) {
    console.error("Error creating flight:", error)
    return next(new AppError("Internal server error", 500))
  }
}

export const updateFlightById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { flightId } = req.params
  const flightData = req.body

  try {
    const updatedFlight = await updateFlightByIdDB(flightId, flightData)

    return sendResponse(res, 200, "Flight updated successfully", {
      data: updatedFlight,
    })
  } catch (error) {
    console.error("Error updating flight:", error)
    return next(new AppError("Internal server error", 500))
  }
}

export const deleteFlightById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  try {
    await deleteFlightDB(id)

    return sendResponse(res, 200, "Flight deleted successfully")
  } catch (error) {
    console.error("Error deleting flight:", error)
    return next(new AppError("Internal server error", 500))
  }
}

export const getFlightsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const flights = await getAllFlightsByUserIdDB(userId)
    return sendResponse(res, 200, "Flights retrieved successfully", flights)
  } catch (error) {
    console.error("Error getting all flights:", error)
    return next(new AppError("Internal server error", 500))
  }
}
