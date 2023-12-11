import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import { ChatPage } from '../pages'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { PrivateRoutes } from './private-routes.guard'
import { PublicRoutes } from './public-routes.guard'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '',
        element: <ChatPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <PublicRoutes />,
    children: [
      { path: '', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <Navigate to='/auth' /> },
    ],
  },
  { path: '*', element: <Navigate to='/' /> },
]

export const router = createBrowserRouter(routes)
