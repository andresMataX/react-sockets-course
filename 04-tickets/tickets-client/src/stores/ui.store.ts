import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  isHidden: boolean
  setIsHidden: (isHidden: boolean) => void
}

const storeApi: StateCreator<UIState> = (set) => ({
  isHidden: false,

  setIsHidden: (isHidden) => set({ isHidden: isHidden }),
})

export const useUIStore = create<UIState>()(devtools(storeApi))
