import { FC } from 'react'

interface Props {}

export const ChatSelect: FC<Props> = () => {
  return (
    <div className='middle-screen'>
      <div className='alert-info'>
        <hr />
        <h3>Seleccione una persona</h3>
        <span>Para comenzar una conversación</span>
        <hr />
      </div>
    </div>
  )
}
