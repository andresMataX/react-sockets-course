import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Message, MessageAPI, UserAPI } from '../interfaces'

interface ChatState {
  uid: string | null
  activeChat: string | null
  users: UserAPI[]
  messages: Message[]

  setUsers: (users: UserAPI[]) => void
  setActiveChat: (uid: string) => void
  addNewMessage: (message: Message) => void
  getMessages: (messages: MessageAPI[]) => void
  clearMessages: () => void
}

const storeApi: StateCreator<ChatState> = (set, get) => ({
  uid: null,
  activeChat: null,
  users: [],
  messages: [],

  setUsers: (users: UserAPI[]) => {
    set({ users })
  },

  setActiveChat: (uid: string) => {
    if (uid === get().activeChat) return

    set({ activeChat: uid, messages: [] })
  },

  addNewMessage: (message: Message) => {
    if (
      message.author.id === get().activeChat ||
      message.destination.id === get().activeChat
    ) {
      set((state) => ({
        messages: [...state.messages, message],
      }))
    }
  },

  getMessages: (messages: MessageAPI[]) => {
    const newMessages: Message[] = messages.map((m) => {
      return {
        id: m.id,
        message: m.message,
        created_at: m.created_at,
        author: {
          id: m.author.id,
        },
        destination: {
          id: m.destination.id,
        },
      }
    })

    set({ messages: newMessages })
  },

  clearMessages: () => {
    set({ messages: [] })
  },
})

export const useChatStore = create<ChatState>()(devtools(storeApi))
