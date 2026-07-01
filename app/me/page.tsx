import { notFound } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"


const Me = async() => {
  const me = await getCurrentUser()
  const list = me?.readingLists

  if (!me) {
    notFound()
  }

  return (
    <div>
      <div>
        <h2>My profile</h2>
        <p><strong>Name: </strong> {me.name}</p>
        <p><strong>Username: </strong> {me.username}</p>
      </div>
      <div>
        <h2>Reading List</h2>
        <ul>
          {list?.map((l) => (
            <li key={l.id}>
              {l.blogs?.title} - {l.read ? "read" : "not read"}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>API Token</h2>
        <p>
          <strong>Current token: </strong> 
          {me.apiToken ? me.apiToken : "no token has been generated"}
        </p>
      </div>
      <form action={generateToken}>
        <input type="hidden" name="username" value={me.username}></input>
        <button type="submit">Generate New Token</button>
      </form>
    </div>
  )
}

export default Me