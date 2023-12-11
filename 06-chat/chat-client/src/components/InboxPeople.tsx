import { FC } from 'react'
import { Searchbox, Sidebar } from '.'

interface Props {}

export const InboxPeople: FC<Props> = () => {
  return (
    <div className='inbox_people'>
      <Searchbox />

      <Sidebar />
    </div>
  )
}
