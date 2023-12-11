import { Socket, io } from 'socket.io-client'
import { StateCreator, create } from 'zustand'

export interface SocketState {
  socket: Socket | null

  connectSocket: (token: string) => void
  disconnectSocket: () => void
}

const storeApi: StateCreator<SocketState> = (set, get) => ({
  socket: null,

  connectSocket: (token: string) => {
    if (get().socket) return

    const socket = io('http://localhost:3000', {
      auth: { token },
      transports: ['websocket'],
    })

    set({ socket })
  },

  disconnectSocket: () => {
    get().socket?.disconnect()
    set({ socket: null })
  },
})

export const useSocketStore = create<SocketState>()(storeApi)
