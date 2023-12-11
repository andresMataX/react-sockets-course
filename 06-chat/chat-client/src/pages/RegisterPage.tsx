import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores'

interface Props {}

export const RegisterPage: FC<Props> = () => {
  const register = useAuthStore((state) => state.register)

  const [formAuth, setFormAuth] = useState({
    email: '',
    password: '123456',
    name: '',
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

    const { email, password, name } = formAuth

    register(name, email, password)
  }

  return (
    <form
      className='login100-form validate-form flex-sb flex-w'
      onSubmit={onSubmit}
    >
      <span className='login100-form-title mb-3'> Chat - Registro </span>

      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='text'
          name='name'
          placeholder='Nombre'
          value={formAuth.name}
          onChange={onChange}
        />

        <span className='focus-input100'></span>
      </div>

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
          <Link to='/auth/' className='txt1'>
            {' '}
            Ya tienes cuenta?{' '}
          </Link>
        </div>
      </div>

      <div className='container-login100-form-btn m-t-17'>
        <button className='login100-form-btn' type='submit'>
          Crear cuenta
        </button>
      </div>
    </form>
  )
}
