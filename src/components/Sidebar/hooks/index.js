import { useContext } from 'react'

import { SidebarContext } from '../SidebarProvider'

export const useSidebar = () => useContext(SidebarContext)
