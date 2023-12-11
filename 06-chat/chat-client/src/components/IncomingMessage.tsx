import { FC } from 'react'
import { getHoraMes } from '../helpers'
import { Message } from '../interfaces'

interface Props {
  message: Message
}

export const IncomingMessage: FC<Props> = ({ message }) => {
  return (
    <div className='incoming_msg'>
      <div className='incoming_msg_img'>
        <img
          src='https://ptetutorials.com/images/user-profile.png'
          alt='sunil'
        />
      </div>

      <div className='received_msg'>
        <div className='received_withd_msg'>
          <p>{message.message}</p>
          <span className='time_date'>{getHoraMes(message.created_at)}</span>
        </div>
      </div>
    </div>
  )
}
