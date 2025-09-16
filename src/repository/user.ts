import { prisma } from "../app"
import { AppError } from "../errors"

async function validationUniqueEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
  })

  if (user) {
    throw new AppError("Email already in use!", 409)
  }
  return true
}

async function findUserById(id: string) {
  const user = await prisma.users.findUnique({
    where: { id },
  })

  if (!user) {
    throw new AppError("User not found!", 404)
  }
  return user
}

const user = {
  validationUniqueEmail,
  findUserById,
}

export default user
