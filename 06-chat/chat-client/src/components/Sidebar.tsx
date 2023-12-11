import { FC } from 'react'
import { SidebarChatItem } from '.'
import { useAuthStore, useChatStore } from '../stores'

interface Props {}

export const Sidebar: FC<Props> = () => {
  const users = useChatStore((state) => state.users)
  const uid = useAuthStore((state) => state.uid)

  return (
    <div className='inbox_chat'>
      {users
        .filter((user) => user.id !== uid)
        .map((user) => (
          <SidebarChatItem key={user.id} user={user} />
        ))}

      <div className='extra_space'></div>
    </div>
  )
}
