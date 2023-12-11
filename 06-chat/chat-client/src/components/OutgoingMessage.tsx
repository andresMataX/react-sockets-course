import { FC } from 'react'
import { getHoraMes } from '../helpers'
import { Message } from '../interfaces'

interface Props {
  message: Message
}

export const OutgoingMessage: FC<Props> = ({ message }) => {
  return (
    <div className='outgoing_msg'>
      <div className='sent_msg'>
        <p>{message.message}</p>
        <span className='time_date'>{getHoraMes(message.created_at)}</span>
      </div>
    </div>
  )
}
