import Link from "next/link"
import { getUsers } from "../services/users"

const User = async () => {
  const users = await getUsers()

  return(
    <div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link href={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User