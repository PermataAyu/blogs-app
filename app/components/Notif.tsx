"use client"

import {useNotif} from "./NotifContex" 

export default function Notif() {
  const {message, type} = useNotif()

  if(!message) {
    return null
  }

  const color = type === "success" ? "bg-green-600" : "bg-red-600"
  const style = `p-4 border-inherit rounded ${color}`

  return <div className={style}>{message}</div>
}