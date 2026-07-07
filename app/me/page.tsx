import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"
import { markRead } from "../actions/readings"


const Me = async() => {
  const me = await getCurrentUser()
  const list = me?.readingLists
  const readLists = list?.filter((l) => l.read === true)
  const unreadLists = list?.filter((l) => l.read === false)

  if (!me) {
    redirect("/login")
  }

  return (
    <div className="mx-auto p-6 max-w-3xl">
      <div data-testid="user-profile">
        <h2>My profile</h2>
        <p data-testid="user-name"><strong>Name: </strong> {me.name}</p>
        <p data-testid="user-username"><strong>Username: </strong> {me.username}</p>
      </div>
      <div>
        <h2>Reading List</h2>
        <div data-testid="unread-section">
          <h3>Unread ({unreadLists?.length})</h3>
          <ul>
            {Number(unreadLists?.length) > 0 ? unreadLists?.map((ul) => (
              <li key={ul.id} className="border bg-yellow-500">
                <form action={markRead}>
                  {ul.blogs?.title} {" - "}
                  <input type="hidden" name="id" value={ul.id}/>
                  <button 
                    type="submit" 
                    className="border bg-green-500 cursor-pointer"
                    data-testid={`mark-read-${ul.id}`}
                  >
                    mark as read
                  </button>
                </form>
              </li>
            ))
            : <div data-testid="no-unread-blogs">No list yet</div>
          }
          </ul>
        </div>
        <div data-testid="reading-list-section">
          <h3>Read ({readLists?.length})</h3>
          <ul>
            {Number(readLists?.length) > 0 ? readLists?.map((rl) => (
              <li key={rl.id} className="border bg-green-500">
                {rl.blogs?.title}
              </li>
            ))
            : <div data-testid="empty-reading-list">No list yet </div>
          }
          </ul>
        </div>
      </div>
      <div data-testid="api-token-section">
        <h2>API Token</h2>
        <div data-testid="token-display">
          <strong>Current token: </strong> 
          {me.apiToken 
            ? <p data-testid="api-token">{me.apiToken}</p> 
            : <p data-testid="no-token-message">no token has been generated</p>
          }
        </div>
      </div>
      <form action={generateToken}>
        <input type="hidden" name="username" value={me.username}></input>
        <button type="submit" data-testid="generate-token-button">Generate New Token</button>
      </form>
    </div>
  )
}

export default Me