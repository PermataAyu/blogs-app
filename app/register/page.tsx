"use client"

import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const initialState = {
    errors: {
      password: "",
      username: ""
    },
    values: {
      username: "",
      name: ""
    }
  }

  const [state, formAction] = useActionState(registerUser, initialState)
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input name="username" type="text" required defaultValue={state.values.username}/>
            {state.errors.username && <p style={{color: "red"}}>{state.errors.username}</p>}
          </label>
        </div>
        <div>
          <label>
            Name
            <input name="name" type="text" required defaultValue={state.values.name}/>
          </label>
        </div>
        <div>
          <label>
            Password
            <input name="password" type="password" required/>
          </label>
        </div>
        <div>
          <label>
            Password Confirm
            <input name="passwordconfirm" type="password" required/>
            {state.errors.password && <p style={{color: "red"}}>{state.errors.password}</p>}
          </label>
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}