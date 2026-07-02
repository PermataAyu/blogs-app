import { db } from "@/db"
import { getCurrentUser } from "./session"
import { readingLists } from "@/db/schema"
import { eq } from "drizzle-orm"

export const addList = async(blogId: number) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  return db.insert(readingLists).values({blogId, userId: user.id})
}

export const updateList = async(id: number) => {
  return db.update(readingLists).set({read: true}).where(eq(readingLists.id, id))
}