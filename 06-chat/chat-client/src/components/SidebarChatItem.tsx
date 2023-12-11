import { FC } from 'react'
import { UserAPI } from '../interfaces'
import { getMessagesByUser } from '../services'
import { useChatStore } from '../stores'

interface Props {
  user: UserAPI
}

export const SidebarChatItem: FC<Props> = ({ user }) => {
  const setActiveChat = useChatStore((state) => state.setActiveChat)
  const activeChat = useChatStore((state) => state.activeChat)
  const getMessages = useChatStore((state) => state.getMessages)

  const onClick = async () => {
    setActiveChat(user.id)

    const resp = await getMessagesByUser(user.id)
    getMessages(resp)
  }

  return (
    <div
      className={activeChat === user.id ? 'chat_list active_chat' : 'chat_list'}
      onClick={onClick}
    >
      <div className='chat_people'>
        <div className='chat_img'>
          <img
            src='https://ptetutorials.com/images/user-profile.png'
            alt='sunil'
          />
        </div>

        <div className='chat_ib'>
          <h5>{user.name}</h5>

          {user.online ? (
            <span className='text-success'>Online</span>
          ) : (
            <span className='text-danger'>Offline</span>
          )}
        </div>
      </div>
    </div>
  )
}
