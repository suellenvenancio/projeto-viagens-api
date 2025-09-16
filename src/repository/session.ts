import { prisma } from "../app"
import crypto from "crypto"
import { AppError } from "../errors"

const EXPIRATIONS_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000 // 30 days

async function createSession(userId: string) {
  const token = crypto.randomBytes(48).toString("hex")
  const expiresAt = new Date(Date.now() + EXPIRATIONS_IN_MILLISECONDS)

  const newSession = await prisma.sessions.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })
  return newSession
}

async function findSessionByToken(token: string) {
  const session = await prisma.sessions.findUnique({
    where: { token },
  })

  if (!session) {
    throw new AppError("Session not found!", 404)
  }

  if (session.expiresAt < new Date()) {
    throw new AppError("Session expired!", 401)
  }

  return session
}

const session = {
  createSession,
  EXPIRATIONS_IN_MILLISECONDS,
  findSessionByToken,
}
export default session
