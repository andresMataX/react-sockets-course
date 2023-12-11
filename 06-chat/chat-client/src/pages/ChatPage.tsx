import { FC } from 'react'
import { ChatSelect, InboxPeople, Messages } from '../components'
import { useChatStore } from '../stores'
import '../styles/chat.css'

interface Props {}

export const ChatPage: FC<Props> = () => {
  const activeChat = useChatStore((state) => state.activeChat)

  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <InboxPeople />

        {activeChat ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  )
}
