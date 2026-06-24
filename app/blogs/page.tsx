const blogs = [
  {
    id: 1,
    title: "first blog",
    author: "anon",
    url: "http://localhost/",
    likes: 0,
  },
  {
    id: 2,
    title: "Second Blog",
    author: "anon",
    url: "http://localhost/",
    likes: 0,
  }
]

const Blog = () => {
  return(
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((b) => (
          <li key={b.id}>
            <strong>{b.title}</strong> by <strong>{b.author}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog