"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function NavBar() {
  const { data: session } = useSession()

  return(
    <nav>
      <Link href="/">Home</Link>
      {" | "}
      <Link href="/blogs">Blogs</Link>
      {" | "}
      <Link href="/users">Users</Link>
      {" | "}
      {session ? (
        <>
        <Link href="/blogs/new">Create Blog</Link>
        {" | "}
        <em>{session.user?.name} logged in</em>
        {" "}
        <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
        <Link href="/login">Login</Link>
        {" | "}
        <Link href="/register">Register</Link>
        </>
      )}
      
    </nav>
  )
}