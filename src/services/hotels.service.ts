import { prisma } from "../config/db"
import { AppError } from "../errors"
import { Hotel } from "../types/app.types"

export const findHotelDB = async (id: string) => {
    try {
        const hotel = await prisma.hotel.findUnique({
            where: { id },
        })
        if (!hotel) {
            throw new AppError("Hotel not found", 404)
        }
        return hotel
    } catch (error) {
        console.error("Error finding hotel:", error)
        throw new AppError("Internal server error", 500)
    }
}
export const createHotelDB = async (hotelData: Hotel) => {
    try {
        const hotel = await prisma.hotel.create({
            data: {
                ...hotelData,
                checkIn: new Date(hotelData.checkIn),
                checkOut: new Date(hotelData.checkOut),
            },
        })
        return hotel
    } catch (error) {
        console.error("Error creating hotel:", error)
        throw new AppError("Internal server error", 500)
    }
}

export const updateHotelDB = async (
    hotelId: string,
    hotelData: Partial<Hotel>
) => {
    try {
        const hotel = await findHotelDB(hotelId)
        const updatedHotel = await prisma.hotel.update({
            where: { id: hotel.id },
            data: hotelData,
        })
        return updatedHotel
    } catch (error) {
        console.error("Error updating hotel:", error)
        throw new AppError("Internal server error", 500)
    }
}

export const deleteHotelDB = async (hotelId: string) => {
    try {
        const hotel = await findHotelDB(hotelId)
        await prisma.hotel.delete({
            where: { id: hotel.id },
        })
        return { message: "Hotel deleted successfully" }
    } catch (error) {
        console.error("Error deleting hotel:", error)
        throw new AppError("Internal server error", 500)
    }
}

export const getAllHotelsByUserIdDB = async (userId: string) => {
    try {
        const hotels = await prisma.hotel.findMany({
            where: { userId },
        })
        return hotels
    } catch (error) {
        console.error("Error getting hotels by user ID:", error)
        throw new AppError("Internal server error", 500)
    }
}
