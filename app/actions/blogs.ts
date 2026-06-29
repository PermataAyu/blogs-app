"use server"

import { redirect } from "next/navigation"
import { addBlog, likeBlog } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: {error: string},
  formData: FormData
) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string

  if ( !title || title.length < 5 ) {
    return { error: "Title minimum 5 character long" }
  }
  const author = formData.get("author") as string
  if ( !author || author.length < 5 ) {
    return {error: "Author minimum 5 character long"}
  }
  const url = formData.get("url") as string
  if ( !url || url.length < 5 ) {
    return {error: "URL minimum 5 character long"}
  }
  
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