import { Navigate } from 'react-router-dom'
import { AuthLayout } from '../layouts'
import { useAuthStore } from '../stores'

export const PublicRoutes = () => {
  const { logged } = useAuthStore()

  return !logged ? <AuthLayout /> : <Navigate to='/' />
}
