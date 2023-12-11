import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import '../styles/login-register.css'

interface Props {}

export const AuthLayout: FC<Props> = () => {
  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div className='wrap-login100 p-t-50 p-b-90'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
