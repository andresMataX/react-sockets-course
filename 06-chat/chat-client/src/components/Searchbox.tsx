import { FC } from 'react'
import { useAuthStore } from '../stores'

interface Props {}

export const Searchbox: FC<Props> = () => {
  const logout = useAuthStore((state) => state.logout)
  const username = useAuthStore((state) => state.name)

  return (
    <div className='headind_srch'>
      <div className='recent_heading mt-2'>
        <h4>
          <b>{username}</b>
        </h4>
      </div>

      <div className='srch_bar'>
        <div className='stylish-input-group'>
          <button className='btn text-danger' onClick={() => logout()}>
            Salir
          </button>
        </div>
      </div>
    </div>
  )
}
