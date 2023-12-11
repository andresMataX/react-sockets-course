import { ChangeEvent, FC, useState } from 'react'
import { useSocket } from '../hooks'

export const BandAdd: FC = () => {
  const [value, setValue] = useState('')
  const { socket } = useSocket()

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (value.trim().length > 0) {
      socket.emit('create-band', value)

      setValue('')
    }
  }

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Nuevo nombre de banda'
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </form>
    </>
  )
}
