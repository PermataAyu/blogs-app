"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { saveToken } from "../services/users"
import { revalidatePath } from "next/cache"

export const registerUser = async (
  prevState: {errors: object, values?: object, success?: boolean},
  formData: FormData
) => {
  const errors: {[key: string]: string} = {}
  const username = (formData.get("username") as string).trim()
  const name = (formData.get("name") as string).trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordconfirm") as string

  if (!username || username.length < 4) {
    errors.username = "username too short"
  }

  if (!password || password.length < 4) {
    errors.password = "password too short"
  }

  if (password !== passwordConfirm) {
    errors.password = "password doesnt match"
  }
  const findUser = await db.query.users.findFirst({where: eq(users.username, username)})
  if (findUser) {
    errors.username = "username already used"
  }

  if (Object.keys(errors).length > 0) {
    return {errors, values: {username, name}, success: false}
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({username, name, passwordHash})

  return {errors, success: true}
}

export const generateToken = async(formData: FormData) => {
  const username = formData.get("username") as string
  const token = crypto.randomUUID()
  await saveToken(token, username)
  revalidatePath('/me')
}