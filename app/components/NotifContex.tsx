"use client"

import { createContext, useContext, useState } from "react"

type NotifType = "success" | "error"

type NotifContextType = {
  message: string,
  type: NotifType,
  showNotif: (message: string, type?: NotifType) => void
}

const NotifContext = createContext<NotifContextType>({
  message: "",
  type: "success",
  showNotif: () => {}
})

export const NotifProvider = ({children}: {children: React.ReactNode}) => {
  const [message, setMessage] = useState("")
  const [type, setType] = useState<NotifType>("success")

  const showNotif = (message: string, notifType: NotifType = "success") => {
    setMessage(message)
    setType(notifType)
    setTimeout(() => setMessage(""), 5000)
  }

  return (
    <NotifContext value={{message, type, showNotif}}>
      {children}
    </NotifContext>
  )
}

export const useNotif = () => useContext(NotifContext)