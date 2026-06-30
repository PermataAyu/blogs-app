"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return(
    <nav className="bg-gray-800 px-6 py-3 flex items-center gap-4">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/blogs">Blogs</NavLink>
      <NavLink href="/users">Users</NavLink>
      {session ? (
        <>
        <NavLink href="/blogs/new">Create Blog</NavLink>
        <em>{session.user?.name} logged in</em>
        {" "}
        <button 
          onClick={() => signOut()} 
          className="border rounded px-2 py-1 text-sm hover:bg-gray-700"
        >
          Logout
        </button>
        </>
      ) : (
        <>
        <NavLink href="/login">Login</NavLink>
        <NavLink href="/register">Register</NavLink>
        </>
      )}
      
    </nav>
  )
}