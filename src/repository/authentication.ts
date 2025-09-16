import bcrypt from "bcryptjs/umd/types"
import { getUserByEmail } from "../services/user.service"
import { AppError } from "../errors"

async function validate(email: string, password: string) {
  try {
    const user = await validateEmail(email)
    await validatePassword(password, user?.password ?? "")

    return user
  } catch (error) {
    console.error("Error validating user:", error)
    if (error instanceof AppError) {
      throw new AppError("Authentication failed!", 401)
    }
    throw error
  }
}

async function validateEmail(email: string) {
  const user = await getUserByEmail(email)
  if (!user) {
    throw new AppError("User not found!", 404)
  }
  return user
}

async function validatePassword(
  providedPassword: string,
  storedPassword: string
) {
  const isMatch = await bcrypt.compare(providedPassword, storedPassword)
  if (!isMatch) {
    throw new AppError("Invalid password!", 401)
  }
  return true
}

const authentication = {
  validate,
}

export default authentication
