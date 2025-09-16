import bcrypt from "bcryptjs"

async function hash(password: string) {
  return await bcrypt.hash(password, 14)
}

async function compare(providedPassword: string, storedPassword: string) {
  return await bcrypt.compare(providedPassword, storedPassword)
}

const password = {
  hash,
  compare,
}

export default password
