import { FC } from 'react'
import { IncomingMessage, OutgoingMessage, SendMessage } from '.'
import { useChatStore } from '../stores'
import { useAuthStore } from '../stores/auth.store'

interface Props {}

export const Messages: FC<Props> = () => {
  const messages = useChatStore((state) => state.messages)
  const uid = useAuthStore((state) => state.uid)

  return (
    <div className='mesgs'>
      <div className='msg_history'>
        {messages.map((m) =>
          m.author.id !== uid ? (
            <IncomingMessage key={m.id} message={m} />
          ) : (
            <OutgoingMessage key={m.id} message={m} />
          )
        )}
      </div>

      <SendMessage />
    </div>
  )
}
