import React, { createContext, useState } from 'react'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import storage from '~/utils/storage'

export const SidebarContext = createContext({})

const SidebarProvider = ({ children }) => {
  const [isMinimal, setIsMinimal] = useState(
    storage.getSessionItem('isMinimal') || false,
  )

  const theme = useTheme()

  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const value = {
    isMinimal,
    setIsMinimal: (val) => {
      setIsMinimal(val)
      storage.setSessionItem('isMinimal', val)
    },
    isMdUp,
    isMdUpMinimal: isMdUp && isMinimal,
    isMdDown: !isMdUp,
  }
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export default SidebarProvider
