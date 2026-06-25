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
    <div>
      <h1>Blogs</h1>
      <form action={searchBlog}>
        <input name="filter" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {(blogs.sort((a, b) => b.likes - a.likes)).map((b) => (
          <li key={b.id}>
            <Link href={`/blogs/${b.id}`}>
              <strong>{b.title}</strong>
            </Link> by <strong>{b.author}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog