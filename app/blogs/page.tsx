import Link from 'next/link'
import {getBlogs} from '../services/blogs'
const Blog = () => {
  const blogs = getBlogs()
  return(
    <div>
      <h1>Blogs</h1>
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