import { registerUser } from "../actions/users";

export default function RegisterPage() {
  return (
    <div>
      <h2>Register</h2>
      <form action={registerUser}>
        <div>
          <label>
            Username
            <input name="username" type="text" required/>
          </label>
        </div>
        <div>
          <label>
            Name
            <input name="name" type="text" required/>
          </label>
        </div>
        <div>
          <label>
            Password
            <input name="password" type="password" required/>
          </label>
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}