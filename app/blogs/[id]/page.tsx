import { likingBlog } from "../../actions/blogs"
import { getBlogById } from "../../services/blogs"
import { notFound } from "next/navigation"

const NotePage = async ({params}: {params: Promise<{id: string}>}) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto p-6">
      <h2 className="text-3xl font-bold pb-5">{blog.title}</h2> 
      <div>by {blog.author}</div>
      <div><a href={blog.url} className="text-blue-600 hover:underline">{blog.url}</a></div>
      <div>
        {blog.likes} likes
      </div>
      <form action={likingBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button 
          className="border rounded px-2 py-1 text-sm hover:bg-gray-50 hover:text-gray-950" 
          type="submit"
        >
          Like
        </button>
      </form>
    </div>
  )

}

export default NotePage