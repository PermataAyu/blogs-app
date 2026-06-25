import { getUserWithBlogs } from "@/app/services/users"
import Link from "next/link"
import { notFound } from "next/navigation"

const UserPage = async ({params}: {params: Promise<{username: string}>}) => {
  const {username} = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return(
    <div>
      <h2>{user.name}</h2>
      <p>username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            <Link href={`/blogs/${b.id}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage