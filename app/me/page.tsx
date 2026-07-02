import { notFound } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"
import { markRead } from "../actions/readings"


const Me = async() => {
  const me = await getCurrentUser()
  const list = me?.readingLists
  const readLists = list?.filter((l) => l.read === true)
  const unreadLists = list?.filter((l) => l.read === false)

  if (!me) {
    notFound()
  }

  return (
    <div className="mx-auto p-6 max-w-3xl">
      <div>
        <h2>My profile</h2>
        <p><strong>Name: </strong> {me.name}</p>
        <p><strong>Username: </strong> {me.username}</p>
      </div>
      <div>
        <h2>Reading List</h2>
        <h3>Unread ({unreadLists ? unreadLists.length : "0"})</h3>
        <ul>
          {unreadLists?.map((ul) => (
            <li key={ul.id} className="border bg-yellow-500">
              <form action={markRead}>
                {ul.blogs?.title} {" - "}
                <input type="hidden" name="id" value={ul.id}/>
                <button type="submit" className="border bg-green-500 cursor-pointer">mark as read</button>
              </form>
            </li>
          ))}
        </ul>
        <h3>Read ({readLists ? readLists.length : "0"})</h3>
        <ul>
          {readLists?.map((rl) => (
            <li key={rl.id} className="border bg-green-500">
              {rl.blogs?.title}
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