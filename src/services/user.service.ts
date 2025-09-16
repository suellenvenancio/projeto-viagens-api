import bcrypt from "bcryptjs"
import { prisma } from "../config/db"
import { RegisterUserInput, User } from "../types/user.types"
import { AppError } from "../errors"
import password from "../repository/password"
import user from "../repository/user"

async function hashedPasswordObject(register: RegisterUserInput) {
  const passwordHashed = await password.hash(register.password)
  return { ...register, password: passwordHashed }
}

export const getUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  })
}

export const findUserByToken = async (token: string) => {
  const session = await prisma.sessions.findFirst({
    where: { token },
  })

  if (!session) {
    throw new AppError("Session not found!", 404)
  }

  if (session.expiresAt < new Date()) {
    throw new AppError("Session expired!", 401)
  }

  const user = await getUserById(session.userId)
  if (!user) {
    throw new AppError("User not found!", 404)
  }
  return user
}

export const getUserById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
  })
}

export const createUser = async (data: RegisterUserInput) => {
  try {
    await user.validationUniqueEmail(data.email)
    const newUser = await hashedPasswordObject(data)

    return await prisma.users.create({
      data: {
        ...newUser,
        createdAt: new Date(),
      },
    })
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
    if (data.email) {
      await user.validationUniqueEmail(data.email)
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
    return updatedUser
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

export const deleteUser = async (id: string) => {
  try {
    await user.findUserById(id)

    await prisma.users.delete({
      where: { id },
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}
