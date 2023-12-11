import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useSocketStore } from '.'
import {
  checkAuthStatusService,
  loginService,
  registerService,
} from '../services'

interface AuthState {
  checking: boolean
  logged: boolean
  uid: string | null
  name: string | null
  email: string | null
  token: string | null

  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  checkToken: () => void
  logout: () => void
}

const storeApi: StateCreator<AuthState> = (set) => ({
  checking: true,
  logged: false,
  uid: null,
  name: null,
  email: null,
  token: null,

  login: async (email: string, password: string) => {
    const data = await loginService(email, password)

    set(() => ({
      checking: false,
      logged: true,
      uid: data.id,
      name: data.name,
      email: data.email,
      token: data.token,
    }))
  },

  register: async (name: string, email: string, password: string) => {
    const data = await registerService(name, email, password)

    set(() => ({
      checking: false,
      logged: true,
      uid: data.id,
      name: data.name,
      email: data.email,
      token: data.token,
    }))
  },

  checkToken: async () => {
    try {
      const { token, email, id, name } = await checkAuthStatusService()

      set({ token, checking: false, logged: true, email, uid: id, name })
    } catch (error) {
      set({
        checking: true,
        logged: false,
        uid: null,
        name: null,
        email: null,
        token: null,
      })
    }
  },

  logout: () => {
    set({
      checking: false,
      logged: false,
      uid: null,
      name: null,
      email: null,
      token: null,
    })
  },
})

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: 'chat-auth' }))
)

useAuthStore.subscribe((nextState) => {
  const { logged, token } = nextState

  logged
    ? useSocketStore.getState().connectSocket(token!)
    : useSocketStore.getState().disconnectSocket()
})
