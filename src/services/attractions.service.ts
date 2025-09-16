import { prisma } from "../config/db"
import { AppError } from "../errors"
import { Hotel, Attraction } from "../types/app.types"

export const findAttractionDB = async (attractionId: string) => {
  try {
    const attraction = await prisma.attractions.findUnique({
      where: { id: attractionId },
    })
    if (!attraction) {
      throw new AppError("Attraction not found!", 404)
    }
    return attraction
  } catch (error) {
    console.error("Error finding attraction:", error)
    throw new AppError("Internal server error", 500)
  }
}

export const createAttractionDB = async (attractionData: Attraction) => {
  try {
    const attraction = await prisma.attractions.create({
      data: attractionData,
    })
    return attraction
  } catch (error) {
    console.error("Error creating attraction:", error)
    throw new AppError("Internal server error", 500)
  }
}

export const updateAttractionDB = async (
  attractionId: string,
  attractionData: Partial<Attraction>
) => {
  try {
    await findAttractionDB(attractionId)
    const updatedAttraction = await prisma.attractions.update({
      where: { id: attractionId },
      data: attractionData,
    })
    return updatedAttraction
  } catch (error) {
    console.error("Error updating attraction:", error)
    throw new AppError("Internal server error", 500)
  }
}

export const deleteAttractionDB = async (attractionId: string) => {
  try {
    await findAttractionDB(attractionId)
    await prisma.attractions.delete({
      where: { id: attractionId },
    })
    return { message: "Attraction deleted successfully" }
  } catch (error) {
    console.error("Error deleting attraction:", error)
    throw new AppError("Internal server error", 500)
  }
}

export const getAllAttractionsByUserIdDB = async (userId: string) => {
  try {
    const attractions = await prisma.attractions.findMany({
      where: { userId },
    })
    return attractions
  } catch (error) {
    console.error("Error fetching attractions:", error)
    throw new AppError("Internal server error", 500)
  }
}
