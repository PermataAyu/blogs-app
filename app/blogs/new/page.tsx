import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  return(
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlog}>
        <div>
          <label>
            Title
            <input type="text" name="title"></input>
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author"></input>
          </label>
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url"></input>
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog