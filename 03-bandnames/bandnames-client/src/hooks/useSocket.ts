import { useEffect, useState } from 'react'
import { useSocketStore } from '../stores'

export const useSocket = () => {
  const socket = useSocketStore((state) => state.socket)

  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setIsOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setIsOnline(false)
    })
  }, [socket])

  return { socket, isOnline }
}
