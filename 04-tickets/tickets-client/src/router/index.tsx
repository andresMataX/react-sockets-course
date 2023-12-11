import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../layouts'
import {
  ColaPage,
  CrearTicketPage,
  EscritorioPage,
  IngresarPage,
} from '../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Navigate to='/ingresar' /> },
      { path: '/*', element: <Navigate to='/ingresar' /> },
      { path: 'ingresar', element: <IngresarPage /> },
      { path: 'cola', element: <ColaPage /> },
      { path: 'crear', element: <CrearTicketPage /> },
      { path: 'escritorio', element: <EscritorioPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
])
