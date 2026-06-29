"use client"

import { useActionState, useEffect } from "react";
import { registerUser } from "../actions/users";
import { useNotif } from "../components/NotifContex";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const initialState = {
    errors: {},
    values: {
      username: "",
      name: ""
    },
    success: false
  }

  const [state, formAction] = useActionState(registerUser, initialState)
  const {showNotif} = useNotif()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotif("User Created")
      router.push("/login")
    }
  }, [state, showNotif, router])
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input name="username" type="text" required defaultValue={state.values?.username}/>
          </label>
          {state.errors.username && <p style={{color: "red"}}>{state.errors.username}</p>}
        </div>
        <div>
          <label>
            Name
            <input name="name" type="text" required defaultValue={state.values?.name}/>
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