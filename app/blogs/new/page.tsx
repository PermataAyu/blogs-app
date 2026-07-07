"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { useNotif } from "@/app/components/NotifContex"
import { useRouter } from "next/navigation"

const NewBlog = () => {
  const initialState = {
    errors: {},
    values: {
      title: "",
      author: "",
      url: ""
    },
    success: false
  }
  const [state, formAction] = useActionState(createBlog, initialState)
  const {showNotif} = useNotif()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotif("Blog Created")
      router.push("/blogs")
    }
  }, [state, showNotif, router])

  return(
    <div className="mx-auto p-6">
      <h2 className="text-3xl font-bold pb-5">Create a new blog</h2>
      <form action={formAction} className="grid max-w-fit" >
        {state.errors.title && <p className="text-red-500 justify-self-end">{state.errors.title}</p>}
        <div className="flex justify-between mb-3">
          <label>
            Title
            <input 
              type="text" 
              name="title" 
              defaultValue={state.values?.title}
              className="border rounded ml-3"
            />
          </label>
        </div>
        {state.errors.author && <p className="text-red-500 justify-self-end">{state.errors.author}</p>}
        <div className="flex justify-between mb-3">
          <label>
            Author
            <input 
              type="text" 
              name="author" 
              defaultValue={state.values?.author}
              className="border rounded ml-3"
            />
          </label>
        </div>
        {state.errors.url && <p className="text-red-500 justify-self-end">{state.errors.url}</p>}
        <div className="flex justify-between mb-3">
          <label>
            URL
            <input 
              type="text" 
              name="url" 
              defaultValue={state.values?.url}
              className="border rounded ml-3"
            />
          </label>
        </div>
        <button 
          type="submit" 
          className="border rounded px-3 cursor-pointer hover:bg-gray-800 max-w-1/3 justify-self-end"
          data-testid="create-blog-button"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog