"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { addList, updateList } from "../services/readings"
import { revalidatePath } from "next/cache"

export const createList = async (formData: FormData) => {
  const session = await auth()

  if(!session) {
    redirect("/login")
  }
  
  const blog = Number(formData.get("blogid"))

  await addList(blog)
  revalidatePath("/me")
}

export const markRead = async (FormData: FormData) => {
  const list = Number(FormData.get("id"))
  
  await updateList(list)
  revalidatePath("/me")
}