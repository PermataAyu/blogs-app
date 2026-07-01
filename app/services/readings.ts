import { db } from "@/db"
import { getCurrentUser } from "./session"
import { readingLists } from "@/db/schema"

export const addList = async(blogId: number) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  return db.insert(readingLists).values({blogId, userId: user.id})
}