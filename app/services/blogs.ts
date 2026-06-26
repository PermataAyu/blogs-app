import { eq, ilike } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { getCurrentUser } from "./session"

/* const blogs = [
  {
    id: 1,
    title: "first blog",
    author: "anon",
    url: "http://localhost/",
    likes: 0,
  },
  {
    id: 2,
    title: "Second Blog",
    author: "anon",
    url: "http://localhost/",
    likes: 0,
  }
] */

//let nextId = 3

export const getBlogs = async (filter: string | undefined) => {
  //return blogs
  if (filter) {
    return db.query.blogs.findMany({where: ilike(blogs.title, `%${filter}%`)})
  }
  return db.query.blogs.findMany()
}

export const getBlogById = async (id: number) => {
  //return blogs.find(b => b.id === id)
  return db.query.blogs.findFirst({where: eq(blogs.id, id)})
}

export const addBlog = async (title: string, author: string, url: string) => {
  //blogs.push({id: nextId++, title, author, url, likes:0})
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }
  await db.insert(blogs).values({title, author, url, userId: user.id})
}

export const likeBlog = async (id: number) => {
  /* const blog = blogs.find(b => b.id === id)
  if (blog) {
    blog.likes = blog.likes + 1
  } */
  const blog = await getBlogById(id)
  if (blog) {
    await db.update(blogs).set({likes: blog.likes + 1}).where(eq(blogs.id, id))
  }
}