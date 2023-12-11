import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore, useChatStore } from '../stores'

interface Props {}

export const LoginPage: FC<Props> = () => {
  const login = useAuthStore((state) => state.login)
  const clearMessages = useChatStore((state) => state.clearMessages)

  useEffect(() => {
    clearMessages()

    return () => {
      clearMessages()
    }
  }, [clearMessages])

  const [formAuth, setFormAuth] = useState({
    email: 'gatuto@test.com',
    password: '123456',
  })

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target

    setFormAuth({
      ...formAuth,
      [name]: value,
    })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { email, password } = formAuth

    login(email, password)
  }

  return (
    <form
      className='login100-form validate-form flex-sb flex-w'
      onSubmit={onSubmit}
    >
      <span className='login100-form-title mb-3'> Chat - Ingreso </span>

      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='email'
          name='email'
          placeholder='Email'
          value={formAuth.email}
          onChange={onChange}
        />

        <span className='focus-input100'></span>
      </div>

      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='password'
          name='password'
          placeholder='Password'
          value={formAuth.password}
          onChange={onChange}
        />

        <span className='focus-input100'></span>
      </div>

      <div className='row mb-3'>
        <div className='col text-right'>
          <Link to='/auth/register' className='txt1'>
            {' '}
            Nueva cuenta?{' '}
          </Link>
        </div>
      </div>

      <div className='container-login100-form-btn m-t-17'>
        <button className='login100-form-btn'>Ingresar</button>
      </div>
    </form>
  )
}
