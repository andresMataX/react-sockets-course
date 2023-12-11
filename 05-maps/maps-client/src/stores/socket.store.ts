import { Socket, io } from 'socket.io-client'
import { StateCreator, create } from 'zustand'

export interface SocketState {
  socket: Socket
}

const storeApi: StateCreator<SocketState> = () => ({
  socket: io('http://localhost:3000', {
    transports: ['websocket'],
  }),
})

export const useSocketStore = create<SocketState>()(storeApi)
