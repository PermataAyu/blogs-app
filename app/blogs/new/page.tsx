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
    success: true
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
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" defaultValue={state.values?.title}/>
          </label>
          {state.errors.title && <p style={{color: "red"}}>{state.errors.title}</p>}
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" defaultValue={state.values?.author}/>
          </label>
          {state.errors.author && <p style={{color: "red"}}>{state.errors.author}</p>}
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url" defaultValue={state.values?.url}/>
          </label>
          {state.errors.url && <p style={{color: "red"}}>{state.errors.url}</p>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog