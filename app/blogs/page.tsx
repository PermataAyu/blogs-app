import Link from 'next/link'
import { getBlogs } from '../services/blogs'
import { searchBlog } from '../actions/blogs'
const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)
  /* const blogs = filter
    ? allblogs.filter(b => b.title.toLowerCase().includes(filter.toLowerCase()))
    : allblogs */

  return(
    <div className="mx-auto p-6">
      <h1 className="font-bold mb-4 text-3xl">Blogs</h1>
      <form action={searchBlog}>
        <input name="filter" className='border p-1 rounded'/>
        <button type="submit" className='border m-2 p-1 rounded'>Search</button>
      </form>
      <ul className="space-y-2">
        {(blogs.sort((a, b) => b.likes - a.likes)).map((b) => (
          <li key={b.id} className="border rounded p-3 hover:bg-gray-800">
            <Link href={`/blogs/${b.id}`} className='text-blue-600 hover:underline'>
              <strong>{b.title}</strong>
            </Link> by <strong>{b.author}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog