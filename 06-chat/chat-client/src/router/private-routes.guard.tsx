import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores'

export const PrivateRoutes = () => {
  const { logged } = useAuthStore()

  return logged ? <Outlet /> : <Navigate to='/auth' />
}
