import React from 'react'

import SidebarProvider from './SidebarProvider'
import Wrapper from './Wrapper'

export default function Sidebar() {
  return (
    <SidebarProvider>
      <Wrapper />
    </SidebarProvider>
  )
}
