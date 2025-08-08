import { prisma } from "../config/db"
import { AppError } from "../errors"
import { Flight } from "../generated/prisma"

export const findFlightDB = async (id: string) => {
    try {
        const flight = await prisma.flight.findUnique({
            where: { id },
        })
        if (!flight) {
            throw new AppError("Flight not found", 404)
        }
        return flight
    } catch (error) {
        console.error("Error finding flight:", error)
        throw new AppError("Internal server error", 500)
    }
}

export const createFlightDB = async (flightData: Flight) => {
    try {
        const flight = await prisma.flight.create({
            data: {
                ...flightData,
                userId: "a4e9ad7f-1727-4f62-9a79-3af0117fdffe",
            },
        })
        return flight
    } catch (error) {
        console.error("Error creating flight:", error)
        throw new AppError("Internal server error", 500)
    }
}

export const updateFlight = async (
    flightId: string,
    flightData: Partial<Flight>
) => {
    try {
        const flight = await findFlightDB(flightId)
        const updatedFlight = await prisma.flight.update({
            where: { id: flight.id },
            data: flightData,
        })
        return updatedFlight
    } catch (error) {
        console.error("Error updating flight:", error)
        throw new AppError("Internal server error", 500)
    }
}

export const deleteFlightDB = async (flightId: string) => {
    try {
        const flight = await findFlightDB(flightId)
        await prisma.flight.delete({
            where: { id: flight.id },
        })
        return { message: "Flight deleted successfully" }
    } catch (error) {
        console.error("Error deleting flight:", error)
        throw new AppError("Internal server error", 500)
    }
}

export const getAllFlightsByUserIdDB = async (userId: string) => {
    try {
        const flights = await prisma.flight.findMany({
            where: { userId },
        })
        return flights
    } catch (error) {
        console.error("Error fetching flights by user ID:", error)
        throw new AppError("Internal server error", 500)
    }
}
