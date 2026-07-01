import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const token = req.headers.get('authorization')
  if (!token || !token.toLowerCase().startsWith('bearer ')) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
  const user = await db.query.users.findFirst({
    where: eq(users.apiToken, token.substring(7)),
    with: {blogs: true} ,
    columns: {
      apiToken: false,
      passwordHash: false
    }
  })
  return NextResponse.json(user)
}