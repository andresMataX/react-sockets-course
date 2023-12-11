import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

interface Props {}

export const TicketApp: FC<Props> = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
