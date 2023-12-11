import { useEffect } from 'react'
import { useUIStore } from '../stores'

export const useHideMenu = (hide: boolean) => {
  const toogleMenu = useUIStore((state) => state.setIsHidden)

  useEffect(() => {
    if (hide) {
      toogleMenu(true)
    } else {
      toogleMenu(false)
    }
  }, [hide, toogleMenu])
}
