import { FC, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useSocket } from './hooks'
import { router } from './router'
import { useAuthStore, useSocketStore } from './stores'

interface Props {}

export const App: FC<Props> = () => {
  const disconnectSocket = useSocketStore((state) => state.disconnectSocket)

  const checkToken = useAuthStore((state) => state.checkToken)
  useSocket()

  useEffect(() => {
    checkToken()

    return () => {
      disconnectSocket()
    }
  }, [disconnectSocket, checkToken])

  return <RouterProvider router={router} />
}
