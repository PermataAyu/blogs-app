import { likingBlog } from "../../actions/blogs"
import { getBlogById } from "../../services/blogs"
import { notFound } from "next/navigation"

const NotePage = async ({params}: {params: Promise<{id: string}>}) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2> 
      <div>by {blog.author}</div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <form action={likingBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit">
            Like
          </button>
        </form>
      </div>
    </div>
  )

}

export default NotePage