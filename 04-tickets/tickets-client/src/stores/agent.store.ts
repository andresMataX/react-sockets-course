import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AgentState {
  agente: string
  escritorio: string

  setAgente: (agente: string) => void
  setEscritorio: (escritorio: string) => void
  logout: () => void
}

const storeApi: StateCreator<AgentState> = (set) => ({
  agente: '',
  escritorio: '',

  setAgente: (agente) => set({ agente }),
  setEscritorio: (escritorio) => set({ escritorio }),
  logout: () => set({ agente: '', escritorio: '' }),
})

export const useAgentStore = create<AgentState>()(
  devtools(persist(storeApi, { name: 'agent-storage' }))
)
