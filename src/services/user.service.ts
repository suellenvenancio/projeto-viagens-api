import bcrypt from "bcryptjs"
import { prisma } from "../config/db"
import { RegisterUserInput, User } from "../types/user.types"

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    })
}

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
    })
}

export const createUser = async (data: RegisterUserInput) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                createdAt: new Date(),
            },
        })

        return user
    } catch (error) {
        console.error("Error creating user:", error)
        throw error
    }
}

export const updateUser = async (
    id: string,
    data: Partial<Omit<User, "id" | "createdAt">>
) => {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        })
        return user
    } catch (error) {
        console.error("Error updating user:", error)
        throw error
    }
}

export const deleteUser = async (id: string) => {
    try {
        await prisma.user.delete({
            where: { id },
        })
    } catch (error) {
        console.error("Error deleting user:", error)
        throw error
    }
}
