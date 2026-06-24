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

let nextId = 3

export const getBlogs = () => {
  return blogs
}

export const getBlogById = (id: number) => {
  return blogs.find(b => b.id === id)
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({id: nextId++, title, author, url, likes:0})
}