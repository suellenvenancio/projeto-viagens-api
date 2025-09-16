import { prisma } from "../config/db"
import { AppError } from "../errors"
import { Flights } from "../generated/prisma"

export const findFlightByIdDB = async (id: string) => {
  try {
    const flight = await prisma.flights.findUnique({
      where: { id },
    })
    if (!flight) {
      throw new AppError("Flight not found!", 404)
    }
    return flight
  } catch (error) {
    console.error("Error finding flight:", error)
    throw new AppError("Internal server error", 500)
  }
}

export const createFlightDB = async (flightData: Flights) => {
  try {
    const flight = await prisma.flights.create({
      data: {
        ...flightData,
      },
    })
    return flight
  } catch (error) {
    console.error("Error creating flight:", error)
    throw new AppError("Internal server error", 500)
  }
}

export const updateFlightByIdDB = async (
  flightId: string,
  flightData: Partial<Flights>
) => {
  try {
    const flight = await findFlightByIdDB(flightId)
    const updatedFlight = await prisma.flights.update({
      where: { id: flight.id },
      data: {
        ...flight,
        ...flightData,
      },
    })
    return updatedFlight
  } catch (error) {
    console.error("Error updating flight:", error)
    throw new AppError("Internal server error", 500)
  }
}

export const deleteFlightDB = async (flightId: string) => {
  try {
    await findFlightByIdDB(flightId)
    await prisma.flights.delete({
      where: { id: flightId },
    })
    return { message: "Flight deleted successfully" }
  } catch (error) {
    console.error("Error deleting flight:", error)
    throw new AppError("Internal server error", 500)
  }
}

export const getAllFlightsByUserIdDB = async (userId: string) => {
  try {
    const flights = await prisma.flights.findMany({
      where: { userId },
    })
    return flights
  } catch (error) {
    console.error("Error fetching flights by user ID:", error)
    throw new AppError("Internal server error", 500)
  }
}
