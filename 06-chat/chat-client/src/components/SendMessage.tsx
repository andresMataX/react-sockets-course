import { FC, FormEvent, useState } from 'react'
import { useAuthStore, useChatStore, useSocketStore } from '../stores'

interface Props {}

export const SendMessage: FC<Props> = () => {
  const socket = useSocketStore((state) => state.socket)
  const uid = useAuthStore((state) => state.uid)
  const to = useChatStore((state) => state.activeChat)

  const [message, setMessage] = useState('')

  const onSubmit = (a: FormEvent<HTMLFormElement>) => {
    a.preventDefault()

    if (message.length === 0) return

    socket?.emit('mensaje-personal', {
      de: uid,
      para: to,
      mensaje: message,
    })

    setMessage('')
  }

  return (
    <form className='type_msg row' onSubmit={onSubmit}>
      <div className='input_msg_write col-sm-9'>
        <input
          type='text'
          className='write_msg'
          placeholder='Mensaje...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className='col-sm-3 text-center'>
        <button className='msg_send_btn mt-3' type='submit'>
          Enviar
        </button>
      </div>
    </form>
  )
}
