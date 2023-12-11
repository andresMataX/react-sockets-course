import { useEffect, useState } from 'react'
import { Message, UserAPI } from '../interfaces'
import { useChatStore, useSocketStore } from '../stores'

export const useSocket = () => {
  const socket = useSocketStore((state) => state.socket)
  const setUsers = useChatStore((state) => state.setUsers)
  const addNewMessage = useChatStore((state) => state.addNewMessage)

  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(socket?.connected || false)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => {
      setIsOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => {
      setIsOnline(false)
    })
  }, [socket])

  useEffect(() => {
    socket?.on('lista-usuarios', (users: UserAPI[]) => {
      setUsers(users)
    })
  }, [socket, setUsers])

  useEffect(() => {
    socket?.on('mensaje-personal', (message: Message) => {
      addNewMessage(message)
    })
  }, [socket, addNewMessage])

  return { socket, isOnline }
}
