"use server"

import { redirect } from "next/navigation"
import { addBlog, likeBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (formData: FormData) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  
  await addBlog(title, author, url)
  revalidatePath('/blogs')
  redirect('/blogs')
}

export const likingBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}

export const searchBlog = async (formData: FormData) => {
  const filter = formData.get("filter")
  redirect(`/blogs?filter=${filter}`)
}